import { createApi, createApiClient, tokenManager } from "@ametie/vue-muza-use";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";
import { toast } from "vue-sonner";

import App from "./App.vue";
import router from "./router";

import "./main.scss";
import { setupApiClient } from "@/shared/api";
import i18n from "@/shared/i18n";

import "vue-multiselect/dist/vue-multiselect.min.css";


// Create Vue app instance
const app = createApp(App);

setupApiClient();

// Install plugins
app.use(createPinia());
app.use(router);
app.use(i18n);

// Register global component
app.component("VueFeather", VueFeather);

// Router readiness
await router.isReady();

const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withAuth: true,
  authOptions: {
    refreshUrl: "/auth/refresh",
    refreshPayload: () => ({
      refreshToken: tokenManager.getRefreshToken(),
    }),
    onTokenRefreshed: (response) => (
      tokenManager.setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })),
    onTokenRefreshFailed: () => router.push("/login"),
  },
});

// 2. Install Plugin
app.use(createApi({
  axios: api,
  onError: (error) => toast.error(error.message),
}));

// Mount the app
app.mount("#app");
