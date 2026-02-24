<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";
import { useThemeStore } from "@/features/theme/store/useThemeStore";
import "vue-sonner/style.css";
import { useLanguageStore } from "@/features/translation/composables/useLanguageStore";

const themeStore = useThemeStore();
const languageStore = useLanguageStore();
const route = useRoute();

themeStore.initTheme();
languageStore.initLanguage();

const layouts = {
  auth: AuthLayout,
  default: DefaultLayout,
};

const routeLayout = computed(() => {
  const metaLayout = route.meta.layout;
  if(typeof metaLayout === "string"){
    return layouts[metaLayout];
  }
  return layouts.default;
});
</script>

<template>
  <div class="h-screen flex flex-col bg-bgBase text-primary">
    <main class="flex-1 w-full overflow-auto">
      <component :is="routeLayout" />
    </main>
  </div>
</template>
