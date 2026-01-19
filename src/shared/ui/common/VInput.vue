<script setup lang="ts">
import { ref, computed, useSlots } from "vue";
import VueFeather from "vue-feather";

import { ValidationState } from "@/features/auth/types";

const props = withDefaults(defineProps<{
  type?: string;
  variant?: string;
  label?: string;
  placeholder?: string;
  supportText?: string;
  validation?: ValidationState;
  iconLeft?: string;
  iconRight?: string;
  iconColor?: string;
}>(), {
  type: "text",
  variant: "main",
  label: "",
  supportText: "",
  placeholder: "",
  validation: undefined,
  iconLeft: "",
  iconRight: "",
  iconColor: "",
});

const model = defineModel<string>();
const emit = defineEmits(["blur"]);

const visible = ref(false);

const handleToggle = () => {
  visible.value = !visible.value;
};

const slots = useSlots();

const inputStyles = {
  main: "border-b border-border focus:border-b-1 focus:border-secondary placeholder:text-placeholder placeholder:text-sm focus:shadow-[0_1px_0_0_theme('colors.secondary')]",
  error: "border-b border-error focus:border-b-1 focus:shadow-[0_1px_0_0_theme('colors.error')]",
  search: "max-w-[20rem] border-2 border-border rounded-lg placeholder-disabled py-[14px] pl-[44px] pr-4 focus:border-borderFocus focus:outline-none",
};

const hasError = computed(() => props.validation?.$error ?? false);

const errorMessage = computed(() => {
  return props.validation?.$errors?.[0]?.$message ?? "";
});



const inputClass = computed(() => {
  const hasLeft = !!slots["icon-left"] || props.iconLeft;
  const hasRight = !!slots["icon-right"] || props.iconRight || props.type === "password";
  const paddingClass = [
    hasLeft ? "pl-[44px]" : "pl-2",
    hasRight ? "pr-[44px]" : "pr-2",
  ].join(" ");

  const colorClass = hasError.value ?
    inputStyles.error
    : inputStyles[props.variant];
  return `${paddingClass} ${colorClass}`;
});
</script>

<template>
  <label
    class="block w-full"
    v-bind="$attrs"
  >
    <p class="text-sm font-medium text-gray-800 mb-1">{{ props.label }}</p>
    <div class="relative">
      <div class="absolute left-4 top-1/2 -translate-y-1/2 flex justify-center items-center">
        <VueFeather
          v-if="props.iconLeft && !$slots['icon-left']"
          :type="props.iconLeft"
          class="w-5 h-5 text-disabled"
          :class="props.iconColor"
        />
        <slot
          v-else-if="$slots['icon-left']"
          name="icon-left"
        />
      </div>

      <input
        v-model="model"
        :type="props.type === 'password'
          ? (visible ? 'text' : 'password')
          : props.type"
        class="w-full bg-transparent outline-none
        focus:outline-none py-2 transition-all duration-300"
        :class="inputClass"
        :placeholder="props.placeholder"
        name="input"
        @blur="emit('blur', $event)"
      >
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute bottom-[4px] right-[10px] w-[25px] p-0
        bg-transparent border-none text-placeholder hover:text-secondary
        transition-colors duration-200"
        @click="handleToggle"
      >
        <VueFeather
          :type="visible ? 'eye' : 'eye-off'"
          class="w-5 h-5"
        />
      </button>
      <div class="absolute bottom-[4px] right-[10px] w-[25px] p-0">
        <VueFeather
          v-if="props.iconRight && props.type !== 'password' && !$slots['icon-right']"
          :type="props.iconRight"
          class="w-5 h-5"
          :class="props.iconColor"
        />
        <slot
          v-else-if="$slots['icon-right']"
          name="icon-right"
        />
      </div>
      <p
        class="text-sm absolute top-[calc(100%+2px)] left-0"
        :class="hasError ? 'text-red-600 font-medium' : 'text-gray-500'"
      >
        {{ hasError ? errorMessage : props.supportText }}
      </p>
    </div>
  </label>
</template>
