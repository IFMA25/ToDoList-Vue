<script setup lang="ts">
import { computed } from "vue";
import VueFeather from "vue-feather";

const modelValue = defineModel<boolean>({ default: false });

const props = withDefaults(defineProps<{
  variant: string;
  label?: string;
  icon?: string;
}>(), {
  variant: "",
  label: "",
  icon: "",
});

const variantStyle = {
  themeSwitch: {
    bodyThumb: "w-[22px] h-[22px] bg-thumb",
    bodySwitch: "w-[64px] h-[26px] bg-switch bg-cover bg-center",
  },
};

const switchClass = computed(() => {
  return variantStyle[props.variant].bodySwitch;
});

const thumbClass = computed(() => {
  const translateThumb = modelValue.value
    ? "left-[calc(100%-2px)] -translate-x-full"
    : "left-[2px]";
  return `${variantStyle[props.variant].bodyThumb} ${translateThumb}`;
});

</script>

<template>
  <label class="inline-block">
    <div
      class="relative rounded-full cursor-pointer transition-all duration-500"
      :class="switchClass"
    >
      <div
        class="absolute top-1/2 -translate-y-1/2 rounded-full
        transition-all duration-300 flex items-center justify-center"
        :class="thumbClass"
      >
        <slot />
        <VueFeather
          v-if="icon"
          :type="props.icon"
        />
      </div>
    </div>
    <input
      id="switch"
      v-model="modelValue"
      type="checkbox"
      class="absolute opacity-0 pointer-events-none"
    >
    <slot name="label">
      <span
        v-if="props.label"
        class="text-sm"
      >{{ props.label }}</span>
    </slot>
  </label>
</template>

