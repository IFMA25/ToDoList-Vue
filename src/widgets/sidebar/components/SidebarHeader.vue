<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";

defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits<{
  toggle: [];
}>();

</script>

<template>
  <VButton
    variant="navItem"
    icon="icon-chevron-up"
    class="w-8 h-8 justify-center"
    :class="isOpen ? '-rotate-90' : 'rotate-90'"
    @click="emit('toggle')"
  />
</template>
