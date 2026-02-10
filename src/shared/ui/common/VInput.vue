<script setup lang="ts">
import { ref, computed, useSlots } from "vue";

import VIcon from "./VIcon.vue";

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
}>(), {
  type: "text",
  variant: "main",
  label: "",
  supportText: "",
  placeholder: "",
  validation: undefined,
  iconLeft: "",
  iconRight: "",
});

const model = defineModel<string>();
const emit = defineEmits(["blur"]);

const visible = ref(false);

const handleToggle = () => {
  visible.value = !visible.value;
};

const slots = useSlots();

const inputStyles = {
  main: "bg-base rounded-lg border-2 border-default focus:border-2 focus:border-primaryText placeholder:text-muted text-primary leading-[1.3]",
  error: "bg-base rounded-lg border-2 border-danger placeholder:text-muted text-primary leading-[1.3]",
  search: "max-w-[20rem] border-2 border-default rounded-lg placeholder-disabled focus:border-borderFocus focus:outline-none ",
};

const hasError = computed(() => props.validation?.$error ?? false);

const errorMessage = computed(() => {
  return props.validation?.$errors?.[0]?.$message ?? "";
});



const inputClass = computed(() => {
  const hasLeft = !!slots["icon-left"] || props.iconLeft;
  const hasRight = !!slots["icon-right"] || props.iconRight || props.type === "password";
  const paddingClass = [
    hasLeft ? "pl-11" : "",
    hasRight ? "pr-11" : "",
  ].join(" ");

  const colorClass = hasError.value ?
    inputStyles.error
    : inputStyles[props.variant];
  return `${paddingClass} ${colorClass}`;
});
</script>

<template>
  <label
    class="block "
    v-bind="$attrs"
  >
    <p
      v-if="props.label"
      class="text-sm leading-[1.2] font-medium mb-1.5"
      :class="hasError ? 'text-danger' : 'text-secondaryText'"
    >{{ props.label }}</p>
    <div class="relative">
      <div
        v-if="props.iconLeft"
        class="absolute left-4 top-1/2 -translate-y-1/2 flex justify-center items-center"
      >
        <VIcon
          v-if="!$slots['icon-left']"
          :type="props.iconLeft"
          class="w-4 h-4 text-muted"
        />
        <slot
          v-else-if="$slots['icon-left']"
          name="icon-left"
        />
      </div>

      <input
        v-model.trim="model"
        :type="props.type === 'password'
          ? (visible ? 'text' : 'password')
          : props.type"
        class="w-full bg-secondaryBg outline-none
        focus:outline-none  transition-all duration-300 px-4 py-3"
        :class="inputClass"
        :placeholder="props.placeholder"
        name="input"
        @blur="emit('blur', $event)"
      >
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute leading-none top-1/2 -translate-y-1/2 right-4
        bg-transparent text-muted hover:text-secondary
        transition-colors duration-200"
        @click="handleToggle"
      >
        <VIcon
          :type="visible ? 'icon-eye' : 'icon-eye-off'"
        />
      </button>
      <div
        class="absolute top-1/2 -translate-y-1/2 right-4 text-muted
      hover:text-secondary transition-colors duration-200"
      >
        <VIcon
          v-if="props.iconRight && props.type !== 'password' && !$slots['icon-right']"
          :type="props.iconRight"
        />
        <slot
          v-else-if="$slots['icon-right']"
          name="icon-right"
        />
      </div>
    </div>
    <p
      v-if="hasError || props.supportText"
      class="text-sm mt-1"
      :class="hasError ? 'text-negative' : 'text-mutedText'"
    >
      {{ hasError ? errorMessage : props.supportText }}
    </p>
  </label>
</template>
