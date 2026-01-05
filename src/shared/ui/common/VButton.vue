<script setup lang="ts">
import { computed } from "vue";
import VueFeather from "vue-feather";
import { RouterLink } from "vue-router";

import VLoader from "./VLoader.vue";

const props = withDefaults(
  defineProps<{
    text: string;
    loading?: boolean;
    type?: string;
    variant?: string;
    disabled?: boolean;
    to?: string | null;
    icon?: string;
  }>(),
  {
    type: "button",
    variant: "main",
    text: "",
    to: null,
    icon: "",
  },
);

const btnStyles = {
  main: "relative overflow-hidden border-none rounded-[10px] py-[12px] px-2 bg-gradient-to-r from-primaryDark to-primaryLight before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primaryLight before:to-primaryDark before:opacity-0 before:transition-opacity before:duration-1000 hover:before:opacity-100 before:z-0 [&>*]:relative [&>*]:z-10 font-semibold text-[18px] leading-[20px] text-white uppercase",
};

const btnClass = computed(() => btnStyles[props.variant] ?? "");

const isRouterLink = computed(() => !!props.to);

</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'button'"
    class="flex justify-center gap-3 cursor-pointer "
    :class="[btnClass, {
      'opacity-60 cursor-not-allowed': props.disabled || props.loading
    }]"
    v-bind="
      isRouterLink
        ? {
          to: props.to,
          ...$attrs,
        }
        : { type: props.type, disabled: props.disabled || props.loading, ...$attrs }
    "
  >
    <span
      v-if="props.loading"
      class="w-[20px] flex justify-center items-center"
    >
      <VLoader
        v-if="props.loading && !$slots['icon-start'] && !props.icon"
        color="white"
      />
      <slot
        v-else-if="$slots['icon-start'] && !props.loading"
        name="icon-start"
      />
      <VueFeather
        v-else-if="props.icon && !props.loading"
        :type="props.icon"
      />
    </span>
    <span
      v-if="props.text"
      class="flex justify-center items-center"
    >
      {{ props.text }}
    </span>
    <span
      v-if="$slots['icon-end']"
      class="w-[25px]"
    >
      <slot
        name="icon-end"
      />
    </span>
  </component>
</template>
