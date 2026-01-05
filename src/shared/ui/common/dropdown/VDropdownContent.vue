<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  isOpen: boolean;
  width?: string;
  placement?: keyof typeof placeVariant;
}>(), {
  width: "w-full",
  placement: "bl",
});

const placeVariant = {
  tf: "top-full left-0",
  bf: "bottom-full left-0",
  tl: "top-full right-[calc(100%-20px)]",
  tr: "top-full left-[calc(100%-20px)]",
  bl: "bottom-full right-[calc(100%-20px)]",
  br: "bottom-full  left-[calc(100%-20px)]",
};

const propContentClass = computed(() => {
  const placement = placeVariant[props.placement];
  return [placement, props.width].join(" ");
});

</script>

<template>
  <Transition name="dropdown">
    <div
      v-if="props.isOpen"
      class="absolute bg-white shadow-lg rounded"
      :class="propContentClass"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
