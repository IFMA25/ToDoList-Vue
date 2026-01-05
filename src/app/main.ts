import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";

import App from "./App.vue";
import router from "./router";

import "./main.scss";
import { setupApiClient } from "@/shared/api";
import i18n from "@/shared/i18n";

// Create Vue app instance
const app = createApp(App);

setupApiClient({
  onTokenRefreshFailed: () => {
    const currentRoute = router.currentRoute.value;

    if (currentRoute.name !== "auth") {
      router.push({
        name: "auth",
        query: { redirect: currentRoute.fullPath },
      });
    }
  },
});

// Install plugins
app.use(createPinia());
app.use(router);
app.use(i18n);

// Register global component
app.component("VueFeather", VueFeather);

// Router readiness
await router.isReady();

// Mount the app
app.mount("#app");
