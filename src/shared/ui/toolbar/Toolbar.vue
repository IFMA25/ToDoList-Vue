<script setup lang="ts">
import VInput from "@/shared/ui/common/VInput.vue";
import VSelect from "@/shared/ui/common/VSelect.vue";

export type ToolbarSelectConfig<Option = unknown> = {
  key: string;
  id: string;
  labelText: string;
  options: Option[];
  label?: string;
  trackBy: string;
  closeOnSelect?: boolean;
  class?: string;
  disabled?: boolean;
};

type SelectValues = Record<string, unknown>;

withDefaults(
  defineProps<{
    showSearch?: boolean;
    searchPlaceholder?: string;
    toolbarClass?: string;
    selects: ToolbarSelectConfig[];
  }>(),
  {
    showSearch: true,
    searchPlaceholder: "",
    toolbarClass: "flex items-center gap-4 mb-6",
  },
);

const search = defineModel<string>("search", { default: "" });
const selectsModel = defineModel<SelectValues>("selects", {
  default: () => ({}),
});

function updateSelect(key: string, value: unknown) {
  selectsModel.value = { ...selectsModel.value, [key]: value };
}
</script>

<template>
  <div :class="toolbarClass">
    <VInput
      v-if="showSearch"
      v-model="search"
      :placeholder="searchPlaceholder"
      type="search"
      variant="search"
      icon-left="icon-search"
    />

    <VSelect
      v-for="s in selects"
      :id="s.id"
      :key="s.key"
      :model-value="selectsModel[s.key]"
      :label-text="s.labelText"
      :options="s.options"
      :label="s.label ?? 'label'"
      :track-by="s.trackBy"
      :close-on-select="s.closeOnSelect ?? true"
      :disabled="s.disabled"
      :class="s.class"
      @update:model-value="(v) => updateSelect(s.key, v)"
    />

    <slot />
  </div>
</template>
