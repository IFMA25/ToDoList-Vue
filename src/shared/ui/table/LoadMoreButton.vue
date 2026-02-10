<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";

const emit = defineEmits<{
  loadMore: [];
}>();
</script>

<template>
  <VButton
    class="mx-auto px-8 mt-2"
    :text="$t('table.loadMore')"
    variant="outline"
    load-color="primaryDark"
    @click="emit('loadMore')"
  />
</template>
