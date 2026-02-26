<script setup lang="ts">
import VIcon from './VIcon.vue';
import VTitle from './VTitle.vue';

const {
  titleText,
  as="div",
  icon,
  colorIcon,
} = defineProps<{
  titleText: string;
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
      <VTitle :text="titleText" variant="containerTitle"/>
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
