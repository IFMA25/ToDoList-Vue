<script setup lang="ts">

defineProps<{
  text: string;
}>();
</script>

<template>
  <h2 class="">
    {{ text }}
  </h2>
</template>
