<script setup>
import { computed } from "vue";
import VueFeather from "vue-feather";
import { RouterLink } from "vue-router";

import VLoader from "./VLoader.vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  btnColor: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "min-h-[40px]",
  },
  to: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: "",
  },
});

const btnColorStyles = {
  green: "bg-green-500 hover:bg-green-600 text-white",
  red: "bg-red-500 hover:bg-red-600 text-black",
  blue: "bg-blue-500 hover:bg-blue-600 text-white",
  gray: "bg-gray-400 hover:bg-gray-500 text-blue-900",
  yellow: "bg-yellow-300 hover:bg-yellow-500 text-black",
};

const btnClass = computed(() => {
  return `
        ${btnColorStyles[props.btnColor] || btnColorStyles.green}
    `;
});

const isRouterLink = computed(() => !!props.to);

</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'button'"
    class="flex justify-center gap-1 px-4 py-2 border rounded
    font-medium min-w-[120px] transition-all duration-300 ease cursor-pointer"
    :class="[btnClass, props.height, {
      'opacity-60 cursor-not-allowed': props.disabled
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
      class="w-[25px] flex justify-center items-center"
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
    <p
      v-if="props.text"
      class="flex justify-center items-center"
    >
      {{ props.text }}
    </p>
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
