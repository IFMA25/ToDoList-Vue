<script setup lang="ts">
import { computed } from "vue";

import { useLanguageStore } from "@/features/translation/composables/useLanguageStore";
import VSelect from "@/shared/ui/common/VSelect.vue";

interface Option {
  label: string;
  value: string;
}

const language = useLanguageStore();

const localeOptions = computed(
  () => language.supportedLocales.map((locale: string) => ({
    label: locale.toUpperCase(),
    value: locale,
  })));


const currentLangDisplay = computed({
  get: () => localeOptions.value.find((option: Option) => option.value === language.currentLang),
  set: (option: Option) => {
    language.setLanguage(option.value);
  },
});
</script>

<template>
  <div data-theme="dark">
    <VSelect
      id="language-switcher"
      v-model="currentLangDisplay"
      :options="localeOptions"
      label="label"
      track-by="value"
      :close-on-select="true"
      class="min-w-[4.375rem]"
    />
  </div>
</template>
