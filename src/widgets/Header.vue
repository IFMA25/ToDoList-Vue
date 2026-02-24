<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import VTitle from "@/shared/ui/common/VTitle.vue";

const route = useRoute();

const title = computed(() => {
  const metaTitle = route.meta.titleHeader;
  return typeof metaTitle === "string" ? metaTitle : "";
});
</script>

<template>
  <div class="flex items-center justify-between rounded-xl border border-surface p-6">
    <div class="flex-1 min-w-0">
      <VTitle
        v-if="title"
        :text="title"
      />
      <div id="header-content" />
    </div>
    <div
      id="header-actions"
      class="flex items-center gap-3 flex-shrink-0 ml-4 empty:hidden"
    />
  </div>
</template>
