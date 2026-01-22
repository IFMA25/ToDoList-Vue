import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";

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

// Mount the app
app.mount("#app");
