<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";
</script>
<template>
  <div class="bg-border-gradient p-[2px] rounded-xl">
    <div class="flex justify-between items-center bg-base h-full w-full rounded-[10px] px-3 py-4">
      <h2 class="text-2xl text-intro font-medium leading-[1.2]">
        {{ $t('lists.title') }}
      </h2>
      <VButton
        icon="icon-plus"
        variant="primary"
        :text="$t('lists.createListBtn')"
      />
    </div>
  </div>
</template>
