<script setup lang="ts">
import { computed } from "vue";
import { Toaster } from "vue-sonner";

import { useThemeStore } from "@/features/theme/store/useThemeStore";
import IconSuccess from "@/shared/assets/icons/checkmark.svg";
import IconError from "@/shared/assets/icons/cross-filled.svg";
import IconInfo from "@/shared/assets/icons/info.svg";
import IconWarning from "@/shared/assets/icons/mark.svg";

const themeStore = useThemeStore();

const toasterTheme = computed(() => themeStore.currentTheme);
</script>

<template>
  <Toaster
    :theme="toasterTheme"
    position="top-center"
    :toast-options="{
      unstyled: true,
      classes: {
        toast: 'toast-custom',
        title: 'toast-title',
        error: 'toast-error',
        success: 'toast-success',
        warning: 'toast-warning',
        info: 'toast-info',
      },
    }"
    :duration="4000"
  >
    <template #success-icon>
      <IconSuccess class="w-6 h-6" />
    </template>

    <template #error-icon>
      <IconError class="w-6 h-6" />
    </template>

    <template #warning-icon>
      <IconWarning class="w-6 h-6" />
    </template>

    <template #info-icon>
      <IconInfo class="w-6 h-6" />
    </template>
  </Toaster>
</template>
