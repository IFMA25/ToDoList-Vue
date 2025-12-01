import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";

import App from "./App.vue";
import router from "./router";

import "./main.scss";
import { setupApiClient } from "@/shared/api";

// Create Vue app instance
const app = createApp(App);

setupApiClient({
  onTokenRefreshFailed: () => {
    const currentRoute = router.currentRoute.value;

    if (currentRoute.name !== "signin") {
      router.push({
        name: "signin",
        query: { redirect: currentRoute.fullPath },
      });
    }
  },
});

// Install plugins
app.use(createPinia());
app.use(router);

// Register global component
app.component("VueFeather", VueFeather);

// Mount the app
app.mount("#app");
