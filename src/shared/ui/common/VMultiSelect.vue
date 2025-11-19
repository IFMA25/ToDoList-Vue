<script setup lang="ts">
import { defineProps, ref } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

type TaggingProps = {
  modelValue: Array<any>;
  options: Array<any>;
  labelKey?: string;
  trackKey?: string;
  placeholder?: string;
  tagPlaceholder?: string;
  label?: string;
  id: string;
};
const props = defineProps<TaggingProps>();

const value = ref(props.modelValue || []);
const options = ref(props.options || []);

function addTag(newTag: string) {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
  };

  options.value.push(tag);
  value.value.push(tag);
}
</script>

<template>
  <div>
    <label class="typo__label">{{ props.label }}</label>

    <Multiselect
      v-bind="$attrs"
      :id="props.id"
      v-model="value"
      :options="options"
      :placeholder="props.placeholder"
      :tag-placeholder="props.tagPlaceholder"
      :label="props.labelKey"
      :track-by="props.trackKey"
      @tag="addTag"
    />
  </div>
</template>


