<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useProfileStore } from "@/features/profile/store/useProfileStore";
import VBtnBack from "@/shared/ui/btnBack/VBtnBack.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VToaster from "@/shared/ui/toaster/VToaster.vue";
import Header from "@/widgets/Header.vue";
import Sidebar from "@/widgets/sidebar/Sidebar.vue";

const profileStore = useProfileStore();
const route = useRoute();

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

const showHeader = computed(() => route.meta.showHeader !== false);

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
        <!-- сделать по другому -->
        <VBtnBack
          v-if="route.meta.title === 'Users'"
          :to="'/users'"
          :text="$t('userInfo.backAllUsers')"
          class="mb-6"
        />
        <Header
          v-if="showHeader"
          class="mb-6"
        />
        <router-view />
      </div>
    </div>
  </div>
</template>
