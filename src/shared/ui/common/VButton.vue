<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";


import VIcon from "./VIcon.vue";
import VLoader from "./VLoader.vue";


const props = withDefaults(
  defineProps<{
    text?: string;
    loading?: boolean;
    loadColor?: string;
    type?: string;
    variant?: string;
    disabled?: boolean;
    to?: string | null;
    icon?: string;
    collapsed?: boolean;
  }>(),
  {
    type: "button",
    loadColor: "white",
    variant: "",
    text: "",
    to: null,
    icon: "",
    collapsed: false,
  },
);


const btnStyles = {
  main: "relative border-none rounded-[10px] py-[12px] px-2 bg-gradient-to-r from-primaryDark to-primaryLight before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primaryLight before:to-primaryDark before:opacity-0 before:transition-opacity before:duration-1000 hover:before:opacity-100 before:z-0 [&>*]:relative [&>*]:z-10 font-semibold text-[18px] leading-[20px] text-white uppercase",
  default: "border border-gray-400 bg-white rounded-[10px] py-[10px] px-10 text-black font-semibold text-[18px] uppercase",
  nav: "items-center gap-2",
};


const btnClass = computed(() => btnStyles[props.variant] ?? "");

const isRouterLink = computed(() => !!props.to);
</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'button'"
    :to="isRouterLink ? props.to : undefined"
    class="flex cursor-pointer"
    v-bind="$attrs"
    :class="[
      btnClass,
      $attrs.class,
      { 'opacity-60 cursor-not-allowed': props.disabled || props.loading }
    ]"
  >
    <span
      v-if="props.icon || props.loading"
      class="w-[20px] flex justify-center items-center"
    >
      <VLoader
        v-if="props.loading && !$slots['icon-start'] && !props.icon"
        :color="props.loadColor"
      />
      <slot
        v-else-if="$slots['icon-start']"
        name="icon-start"
      />
      <VIcon
        v-else
        :name="props.icon"
      />
    </span>
    <span
      v-if="props.text"
      class="flex items-center transition-all"
      :class="props.collapsed
        ? 'opacity-0 w-0 delay-50 pointer-events-none'
        : 'opacity-100 delay-100'"
      :aria-hidden="props.collapsed ? 'true' : 'false'"
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
