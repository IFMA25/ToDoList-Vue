<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits<{ (e: "close"): void }>();

const props = withDefaults(defineProps<{
  isOpen: boolean;
  width?: string;
  placement?: keyof typeof placeVariant;
}>(), {
  width: "w-full",
  placement: "bottom",
});

const placeVariant = {
  bottom: "top-full right-0",
  top: "bottom-full right-0",
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
      class="absolute text-nowrap min-w-40 border border-default bg-white
        shadow-dropdown rounded py-3 px-5 text-primary text-base z-10"
      :class="propContentClass"
      v-bind="$attrs"
      @click="emit('close')"
    >
      <slot />
    </div>
  </Transition>
</template>
