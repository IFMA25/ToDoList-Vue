<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
import { useThemeStore } from "@/features/theme/store/useThemeStore";
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const themeStore = useThemeStore();
themeStore.initTheme();


const route = useRoute();

const layouts = {
  auth: AuthLayout,
  default: DefaultLayout,
};

const routeLayout = computed(() => {
  const metaLayout = route.meta.layout;
  if(typeof metaLayout === "string"){
    return layouts[metaLayout];
  }
  return layouts.default; ;
});
</script>

<template>
  <Toaster position="top-center"/>
  <header class="fixed top-0 left-0 w-full bg-transparent z-50 px-4 py-2">
    <ThemeToggle />
  </header>
  <main>
    <component :is="routeLayout" />
  </main>
</template>
