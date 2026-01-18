<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits<{ (e: "close"): void }>();

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
  br: "bottom-full left-[calc(100%-20px)]",
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
      class="absolute bg-white shadow-lg rounded py-2 z-20 min-w-max p-6"
      :class="propContentClass"
      v-bind="$attrs"
      @click="emit('close')"
    >
      <slot />
    </div>
  </Transition>
</template>
