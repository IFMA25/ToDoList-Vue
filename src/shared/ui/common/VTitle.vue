<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <h2 class="w-full text-left font-semibold text-[2rem]">
    {{ text }}
  </h2>
</template>
