<script setup lang="ts">
import { computed } from "vue";
import VueFeather from "vue-feather";

const modelValue = defineModel<boolean>({
  default: false,
});

const props = defineProps<{
  width: string
  height: string
  variant: string
  validation?: {
    error: boolean
    message: string
  }
  label?: string
  icon?: string
  iconSize?: string
  disabled?: boolean
}>();

const colorCheck = "text-base";

const variantClass = {
  checked: {
    default: "border-2 border-primaryBg bg-primaryBg",
  },
  notChecked: {
    default: "border-2 border-default",
  },
};

const checkboxClass = computed(() => {
  const sizeCheckbox = `${props.width} ${props.height}`;
  const colorCheckbox = modelValue.value
    ? variantClass.checked[props.variant]
    : variantClass.notChecked[props.variant];

  const errorClass = props.validation?.error ? "border-danger" : "";
  const disabledClass = props.disabled ? "border-subtle bg-subtle" : "";

  return [colorCheckbox, sizeCheckbox, colorCheck, errorClass, disabledClass];
});

</script>

<template>
  <label
    class="relative flex gap-3 cursor-pointer select-none"
    :class="{ 'cursor-pointer': !disabled, 'cursor-not-allowed opacity-60': disabled }"
    v-bind="$attrs"
  >
    <div
      class="relative flex items-center justify-center border-2 rounded transition-all duration-200"
      :class="checkboxClass"
    >
      <VueFeather
        v-if="modelValue"
        :type="props.icon || 'check'"
        :class="props.iconSize || 'w-4 h-4'"
      />
    </div>
    <input
      v-model="modelValue"
      :disabled="disabled"
      type="checkbox"
      class="absolute opacity-0 pointer-events-none"
    >
    <slot name="label">
      <p
        v-if="props.label"
        class="inline-block leading-[1.3]"
      >{{ props.label }}</p>
      <p
        v-if="props.validation?.error"
        class="text-sm absolute top-[100%] left-0 text-danger font-medium"
      >
        {{ props.validation.message }}
      </p>
    </slot>
  </label>
</template>
