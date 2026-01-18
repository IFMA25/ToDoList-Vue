<script setup lang="ts">
import { ref, onUnmounted, watch } from "vue";

import VDropdownContent from "./VDropdownContent.vue";

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const close = () => { isOpen.value = false; };
const toggle = () => { isOpen.value = !isOpen.value; };

const handleOutsideInteraction = (event: Event) => {
  if (dropdownRef.value &&
    event.target instanceof Node &&
    !dropdownRef.value.contains(event.target)) {
    close();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) close();
};

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener("click", handleOutsideInteraction);
    window.addEventListener("keydown", handleKeydown);
  } else {
    document.removeEventListener("click", handleOutsideInteraction);
    window.removeEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideInteraction);
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative"
  >
    <slot
      name="trigger"
      :toggle="toggle"
      :is-open="isOpen"
    />

    <VDropdownContent
      :is-open="isOpen"
      v-bind="$attrs"
      @close="close"
    >
      <slot />
    </VDropdownContent>
  </div>
</template>
