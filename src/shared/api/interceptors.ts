/**
 * API Interceptors
 *
 * Modular interceptors for axios
 * - Request interceptor for adding token
 * - Response interceptor for handling 401 and token refresh
 * - Race condition protection for token refresh
 */

import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

import { trackAuthEvent, AuthEventType } from "./monitor";
import { tokenManager, TOKEN_TYPE } from "./tokenManager";
import type { RefreshTokenResponse } from "./types.ts";

export const AUTH_HEADER = "Authorization";
export const REFRESH_TOKEN_URL = "/auth/refresh";

interface FailedRequestQueue {
  resolve: (value: string) => void
  reject: (reason: unknown) => void
}

let failedQueue: FailedRequestQueue[] = [];
let isRefreshing = false;

function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else if (token) promise.resolve(token);
  });
  failedQueue = [];
}

export function setupRequestInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const extendedConfig = config as InternalAxiosRequestConfig & {
        authMode?: "default" | "public" | "optional"
      };

      const authMode = extendedConfig.authMode || "default";

      if (authMode === "public") return config;

      const authHeader = tokenManager.getAuthHeader();
      if (authHeader) {
        config.headers.set(AUTH_HEADER, authHeader);
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );
}

export function setupResponseInterceptor(
  axiosInstance: AxiosInstance,
  onTokenRefreshFailed?: () => void,
): void {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
        authMode?: "default" | "public" | "optional"
      };

      if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      const authMode = originalRequest.authMode || "default";
      if (authMode === "public" || authMode === "optional") {
        return Promise.reject(error);
      }

      if (originalRequest.url?.includes(REFRESH_TOKEN_URL)) {
        isRefreshing = false;
        processQueue(error, null);
        tokenManager.clearTokens();
        onTokenRefreshFailed?.();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        trackAuthEvent(AuthEventType.REQUEST_QUEUED, { url: originalRequest.url });
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.set(AUTH_HEADER, `${TOKEN_TYPE} ${token}`);
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: unknown) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      trackAuthEvent(AuthEventType.REFRESH_START, { url: originalRequest.url });

      try {
        const response = await axiosInstance.post<RefreshTokenResponse>(
          REFRESH_TOKEN_URL,
          {},
          {
            authMode: "public",
            withCredentials: true,
            // headers: { [AUTH_HEADER]: tokenManager.getAuthHeader() }
          } as InternalAxiosRequestConfig & { authMode: "public" },
        );

        const accessToken = (response.data as Omit<RefreshTokenResponse, "accessToken">).access_token || response.data.accessToken;

        tokenManager.setTokens({ accessToken });

        axiosInstance.defaults.headers.common[AUTH_HEADER] = `${TOKEN_TYPE} ${accessToken}`;

        trackAuthEvent(AuthEventType.REFRESH_SUCCESS);
        processQueue(null, accessToken);

        originalRequest.headers.set(AUTH_HEADER, `${TOKEN_TYPE} ${accessToken}`);
        return axiosInstance(originalRequest);
      }
      catch (refreshError) {
        trackAuthEvent(AuthEventType.REFRESH_ERROR, { error: refreshError });
        processQueue(refreshError, null);
        tokenManager.clearTokens();
        onTokenRefreshFailed?.();
        return Promise.reject(refreshError);
      }
      finally {
        isRefreshing = false;
      }
    },
  );
}

export function setupInterceptors(axiosInstance: AxiosInstance,
  options: { onTokenRefreshFailed?: () => void } = {}) {
  setupRequestInterceptor(axiosInstance);
  setupResponseInterceptor(axiosInstance, options.onTokenRefreshFailed);
}

export function getRefreshStatus() {
  return { isRefreshing, queueLength: failedQueue.length };
}
