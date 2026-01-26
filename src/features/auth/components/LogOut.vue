<script setup lang="ts">
import { useProfileStore } from "@/features/profile/store/useProfileStore";
import  VButton  from "@/shared/ui/common/VButton.vue";

defineProps<{
  collapsed?: boolean
}>();
const profileStore = useProfileStore();

</script>

<template>
  <VButton
    text="Logout"
    variant="nav"
    icon="logout"
    :collapsed="collapsed"
    @click="profileStore.handleLogout()"
  />
</template>
