<script setup lang="ts">
import VButton from "../common/VButton.vue";

const {
  to,
  text,
} = defineProps<{
  to: string;
  text: string;
}>();
</script>

<template>
  <VButton
    variant="navItem"
    :to="to"
    :text="text"
    icon="chevron-left"
    class="inline-block text-muted font-normal"
  />
</template>
