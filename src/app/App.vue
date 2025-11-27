<script setup lang="ts">
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
import { useThemeStore } from "@/features/theme/store/useThemeStore";

const themeStore = useThemeStore();
themeStore.initTheme();

</script>
<template>
  <div
    id="app"
    class="min-h-screen bg-base-100 text-neutral"
  >
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <ThemeToggle />
      <RouterView />
    </main>
  </div>
</template>
