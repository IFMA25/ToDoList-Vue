<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Toaster } from "vue-sonner";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";
import { useThemeStore } from "@/features/theme/store/useThemeStore";
import "vue-sonner/style.css";
// import Header from "@/widgets/Header.vue";

const themeStore = useThemeStore();
const route = useRoute();

themeStore.initTheme();

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
  <div class="h-screen flex flex-col">
    <Toaster position="top-center" />
    <!-- <header class="flex justify-end w-full px-6 py-4 bg-white gap-4 border-2 border-black-300">
      <Header />
    </header> -->
    <main class="flex-1 mx-auto w-full max-w-[1920px] overflow-auto">
      <component :is="routeLayout" />
    </main>
    <footer class="flex-none bg-gray-800 text-white px-6 py-4 h-50 border-2 border-green-600">
      Footer
    </footer>
  </div>
</template>
