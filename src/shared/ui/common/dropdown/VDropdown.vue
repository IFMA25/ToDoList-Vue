<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isOpen = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

const close = () => (isOpen.value = false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const handelClick = (e: MouseEvent) => {
  const target = e.target;
  if(!dropdownRef.value) return;

  if(target instanceof Node && !dropdownRef.value.contains(target)){
    close();
  }
};

const handelKeyDown = (e: KeyboardEvent) => {
  if(e.key === "Escape" && isOpen.value){
    close();
  }
};

onMounted(() => {
  document.addEventListener("click", handelClick);
  document.addEventListener("keydown", handelKeyDown);
});
onUnmounted(() => {
  document.removeEventListener("click", handelClick);
  document.removeEventListener("keydown", handelKeyDown);
});

</script>

<template>
  <div
    ref="dropdownRef"
    class="relative inline-block"
  >
    <slot
      name="trigger"
      :toggle="toggle"
      :is-open="isOpen"
    />
    <slot
      name="content"
      :is-open="isOpen"
      :close="close"
    />
  </div>
</template>
