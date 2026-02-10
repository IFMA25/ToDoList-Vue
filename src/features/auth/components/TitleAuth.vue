<script setup lang="ts">

defineProps<{
  text: string;
}>();
</script>

<template>
  <h2 class="text-5xl text-primaryTextDark font-semibold font-rubik text-center mb-8">
    {{ text }}
  </h2>
</template>
