<script setup lang="ts">

const { text, variant = "base" } = defineProps<{
  text: string;
  variant?: "auth" | "base";
}>();

const variantStyle = {
  auth: "text-5xl text-primaryTextDark font-semibold font-rubik text-center",
  base: "text-left font-semibold text-[2rem]",
};
</script>

<template>
  <h2 :class="variantStyle[variant]">
    {{ text }}
  </h2>
</template>
