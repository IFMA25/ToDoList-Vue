<script setup lang="ts">
import VIcon from "./VIcon.vue";

const {
  titleText,
  // colorSubTitle,
  as="div",
  icon,
  colorIcon,
  subtitleText,
} = defineProps<{
  titleText: string;
  subtitleText?: string;
  // colorSubTitle?: string;
  as?: string;
  icon?: string;
  colorIcon?: string;
}>();

</script>

<template>
  <component
    :is="as"

    class="relative rounded-xl border border-surface shadow bg-base transition hover:shadow-md p-6"
  >
    <div>
      <VIcon
        v-if="icon"
        type="icon"
        :class="colorIcon"
      />
      <h2 class="text-xl font-semibold leading-[1.3] text-center mb-4">
        {{ titleText }}
      </h2>
      <p
        v-if="subtitleText"
        class="text-xs text-muted leading-[1.1]"
      >
        {{ subtitleText }}
      </p>
    </div>


    <div
      v-if="$slots.default"
      class="flex flex-col gap-8 p-4"
    >
      <slot />
    </div>
    <div
      v-if="$slots['container-actions']"
      v-bind="$attrs"
    >
      <slot name="container-actions" />
    </div>
  </component>
</template>
