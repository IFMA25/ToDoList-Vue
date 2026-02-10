<script setup lang="ts">
import { useProfileStore } from "@/features/profile/store/useProfileStore";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VToaster from "@/shared/ui/toaster/VToaster.vue";
import Sidebar from "@/widgets/sidebar/Sidebar.vue";

const profileStore = useProfileStore();

const navItems = [
  {
    icon: "home",
    text: "dashboard",
    to: "/",
  },
  {
    icon: "lists",
    text: "lists",
    to: "/lists",
  },
  {
    icon: "chart",
    text: "analytics",
    to: "/analytics",
  },
  {
    icon: "profile",
    text: "profile",
    to: "/profile",
  },
  {
    icon: "tools",
    text: "admin panel",
    to: "/users",
  },
];

// const route = useRoute();

// const showHeader = computed(() => route.meta.showHeader === true);

</script>

<template>
  <div class="h-full flex justify-center items-center">
    <VLoader
      v-if="profileStore.loading"
      color="primaryDark"
      size="w-[100px] h-[100px]"
    />
    <div
      v-else
      class="flex w-full h-full"
    >
      <Sidebar :nav-items="navItems" />
      <VToaster />

      <!-- <div
          class="flex-none flex justify-between items-center
          bg-white border border-gray-300 rounded-lg p-4"
        >
          <Profile :data-profile="profileStore.profileData" />
        </div> -->
      <div class="flex-1 overflow-hidden px-12 py-6">
        <router-view />
      </div>
    </div>
  </div>
</template>
