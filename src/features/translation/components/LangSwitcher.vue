<script setup lang="ts">
import { computed } from "vue";

import { useLanguageStore } from "@/features/translation/composables/useLanguageStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";
import VDropdownContent from "@/shared/ui/common/dropdown/VDropdownContent.vue";


const language = useLanguageStore();

const languageText = computed(() => {
  return language.currentLang.toUpperCase();
});

const supportedLocales = language.supportedLocales();

const changeLang = (lang: string, close: () => void) => {
  language.setLanguage(lang);
  close();
};
</script>

<template>
  <VDropdown>
    <template #trigger="{toggle}">
      <VButton
        :text="languageText"
        @click="toggle"
      />
    </template>
    <template #content="{ isOpen, close }">
      <VDropdownContent
        :is-open="isOpen"
        placement="tf"
      >
        <template #default>
          <ul class="text-center cursor-pointer">
            <li
              v-for="locale in supportedLocales"
              :key="locale"
              @click="changeLang(locale, close)"
            >
              {{ locale.toUpperCase() }}
            </li>
          </ul>
        </template>
      </VDropdownContent>
    </template>
  </VDropdown>
</template>
