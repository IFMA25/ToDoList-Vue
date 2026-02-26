<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";
</script>
<template>
  <Teleport
    to="#header-actions"
    defer
  >
    <VButton
      icon="icon-plus"
      variant="primary"
      :text="$t('lists.createListBtn')"
    />
  </Teleport>
</template>
