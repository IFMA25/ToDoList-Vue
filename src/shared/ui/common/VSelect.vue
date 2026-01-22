<script setup lang="ts">
import { computed } from "vue";
import Multiselect from "vue-multiselect";

type Option = string;

interface Props {
  id:string;
  options: Option[];
  labelText?: string;
  multiple?: boolean;
  closeOnSelect?: boolean;
  openDirection?: "top" | "bottom";
  placeholder?: string;
  showLabels?: boolean;
  allowEmpty?: boolean;
  multiselectProps?: Record<string, unknown>;
}

const {
  id = "select",
  labelText="",
  options = [],
  multiple = false,
  closeOnSelect: closeOnSelectProp,
  openDirection = "bottom",
  placeholder = "",
  showLabels = false,
  allowEmpty = false,
  multiselectProps = {},
} = defineProps<Props>();

const model = defineModel<Option | Option[] | null>();

const closeOnSelectComputed = computed(() =>
  closeOnSelectProp ?? !multiple,
);
</script>

<template>
  <div class="v-select flex gap-2 items-center text-[1rem] leading-6 text-primary">
    <label
      :for="id"
      class="whitespace-nowrap"
    >{{ labelText }}</label>
    <Multiselect
      :id="id"
      v-model="model"
      v-bind="multiselectProps"
      :options="options"
      :multiple="multiple"
      :close-on-select="closeOnSelectComputed"
      :open-direction="openDirection"
      :placeholder="placeholder"
      :show-labels="showLabels"
      :allow-empty="allowEmpty"
      aria-label="pick a value"
    />
  </div>
</template>

<style scoped>
.v-select :deep(.multiselect) {
  @apply w-full text-primary;
}

.v-select :deep(.multiselect__input) {
  @apply mb-0 p-0;
}

.v-select :deep(.multiselect__tags) {
  @apply min-h-8 border-2 border-default rounded-lg py-[0.5rem] pl-[0.625rem]
  pr-[2.4rem] focus:outline-none transition-colors duration-300 ease-in-out text-primary;
}

.v-select :deep(.multiselect__tags:focus-within) {
  @apply border-borderFocus;
}

.v-select :deep(.multiselect__single),
.v-select :deep(.multiselect__placeholder) {
  @apply m-0 p-0 bg-transparent placeholder-disabled;
}

.v-select :deep(.multiselect__content-wrapper) {
  @apply mt-[4px] rounded-lg border-2 border-default bg-white shadow-lg;
  border-top-style: solid;
  border-top-width: 2px;
}

.v-select :deep(.multiselect__select) {
  @apply h-full top-0;
}

.v-select :deep(.multiselect__select::before) {
  @apply block top-1/2 -translate-y-1/2 m-0 border-0 w-[1.25rem] h-[1.25rem]
    bg-current text-secondary
    [mask:url('/icons/icon-chevron-up.svg')_no-repeat_center/contain]
    [-webkit-mask:url('/icons/icon-chevron-up.svg')_no-repeat_center/contain];
}

.v-select :deep(.multiselect__option--highlight) {
  @apply bg-default text-primary;
}

/* selected */
.v-select :deep(.multiselect__option--selected) {
  @apply  text-primarySelected bg-white;
}
</style>
