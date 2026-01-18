<script setup lang="ts">
import { computed } from "vue";

import { useLanguageStore } from "@/features/translation/composables/useLanguageStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";

const language = useLanguageStore();

const languageText = computed(() => {
  return language.currentLang.toUpperCase();
});

const supportedLocales = language.supportedLocales();

const changeLang = (lang: string) => {
  language.setLanguage(lang);
};
</script>

<template>
  <VDropdown placement="tf">
    <template #trigger="{toggle}">
      <VButton
        :text="languageText"
        @click="toggle"
      />
    </template>
    <ul class="text-center cursor-pointer">
      <li
        v-for="locale in supportedLocales"
        :key="locale"
        @click="changeLang(locale)"
      >
        {{ locale.toUpperCase() }}
      </li>
    </ul>
  </VDropdown>
</template>
