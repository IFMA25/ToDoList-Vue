<script setup lang="ts">
import  VButton  from "@/shared/ui/common/VButton.vue";

defineProps<{
  collapsed?: boolean
}>();

const emit = defineEmits<{
  logout: [];
}>();
</script>

<template>
  <VButton
    text="Logout"
    variant="navItem"
    icon="logout"
    :collapsed="collapsed"
    @click="emit('logout')"
  />
</template>
