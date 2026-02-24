import { createApi, createApiClient, tokenManager } from "@ametie/vue-muza-use";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";
import { toast } from "vue-sonner";

import App from "./App.vue";
import router from "./router";
import "./main.scss";
import { RouteNames } from "../shared/config/routeNames";

import i18n from "@/shared/i18n";
import "vue-multiselect/dist/vue-multiselect.min.css";

const app = createApp(App);

const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withAuth: true,
  authOptions: {
    refreshUrl: "/auth/refresh",
    refreshPayload: () => ({
      refreshToken: tokenManager.getRefreshToken(),
    }),
    onTokenRefreshFailed: () => {
      tokenManager.clearTokens();
      router.push({ name: RouteNames.auth, query: { mode: "signin" } });
    },
  },
});

app.use(createApi({
  axios: api,
  onError: (error) => toast.error(error.message),
}));

app.use(createPinia());
app.use(router);
app.use(i18n);

app.component("VueFeather", VueFeather);

await router.isReady();
app.mount("#app");
