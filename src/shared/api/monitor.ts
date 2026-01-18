/**
 * Auth Monitor Utility
 *
 * Centralized logging and monitoring for authentication events.
 * This can be easily extended to send events to Sentry, Datadog,
 * or other APM tools in the future.
 */

export enum AuthEventType {
  REFRESH_START = "AUTH_REFRESH_START",
  REQUEST_QUEUED = "AUTH_REQUEST_QUEUED",
  REFRESH_SUCCESS = "AUTH_REFRESH_SUCCESS",
  REFRESH_ERROR = "AUTH_REFRESH_ERROR",
}

export interface AuthEventPayload {
  url?: string;
  queueSize?: number;
  error?: unknown;
  timestamp?: string;
  requestId?: string;
  details?: Record<string, unknown>;
}

/**
 * Safely masks a token string for logging purposes
 * Returns '***abcd' or 'undefined'
 */
// const maskToken = (token?: string): string => {
//   if (!token) return "undefined";
//   if (token.length < 10) return "***";
//   return `***${token.slice(-4)}`;
// };

/**
 * Track authentication events
 */
// export function trackAuthEvent(type: AuthEventType, payload: AuthEventPayload = {}): void {
//   const timestamp = new Date().toISOString();

// Prepare structured log data
// const logData = {
//   event: type,
//   timestamp,
//   ...payload,
// };

// In production, you would replace console.log with your APM client
// Example: Sentry.addBreadcrumb({ category: 'auth', message: type, data: payload });

// return;
// switch (type) {
//   case AuthEventType.REFRESH_START:
//     console.groupCollapsed(`🔐 [Auth] Token Refresh Triggered`);
//     console.log("Trigger Request:", payload.url);
//     console.log("Timestamp:", timestamp);
//     console.groupEnd();
//     break;
//
//   case AuthEventType.REQUEST_QUEUED:
//     console.warn(`⏳ [Auth] Request Queued: ${payload.url} (Queue Size: ${payload.queueSize})`);
//     break;
//
//   case AuthEventType.REFRESH_SUCCESS:
//     console.info(`✅ [Auth] Refresh Successful. Resuming ${payload.queueSize} requests.`);
//     break;
//
//   case AuthEventType.REFRESH_ERROR:
//     console.error(`🔥 [Auth] Refresh Failed!`, payload.error);
//     break;
//
//   default:
//     console.log(`[Auth Monitor] ${type}`, logData);
// }
// }
