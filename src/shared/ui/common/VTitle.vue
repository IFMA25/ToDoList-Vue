<script setup lang="ts">

type ButtonVariant = "auth" | "base";

const { text, variant = "base" } = defineProps<{
  text: string;
  variant?: ButtonVariant;
}>();

const variantStyle: Record<ButtonVariant, string> = {
  auth: "text-5xl text-primaryTextDark font-semibold font-rubik text-center",
  base: "text-left font-semibold text-[2rem]",
};
</script>

<template>
  <h2 :class="variantStyle[variant]">
    {{ text }}
  </h2>
</template>
