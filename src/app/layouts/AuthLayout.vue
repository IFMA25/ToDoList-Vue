<script setup lang="ts">
import LangSwitcher from "@/features/translation/components/LangSwitcher.vue";
</script>
<template>
  <div
    class="relative h-full bg-authBg bg-cover bg-no-repeat"
  >
    <LangSwitcher class="absolute top-4 right-6" />
    <div class="container flex flex-col items-center justify-center mx-auto">
      <router-view />
    </div>
  </div>
</template>

