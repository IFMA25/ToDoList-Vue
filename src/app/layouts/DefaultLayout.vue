<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import Profile from "@/features/profile/components/Profile.vue";
import { useProfileStore } from "@/features/profile/store/useProfileStore";
import { tokenManager } from "@/shared/api";
import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";

const router = useRouter();
const profileStore = useProfileStore();

const handleLogout = () => {
  tokenManager.clearTokens();
  router.push({ name: "auth", query: { mode: "signin" } });
  profileStore.removeProfileData();
};

onMounted(() => {
  profileStore.fetchProfile();
});
</script>

<template>
  <div class="h-full flex justify-center items-center p-5">
    <VLoader
      v-if="profileStore.loading"
      color="primaryDark"
      size="w-[100px] h-[100px]"
    />
    <div
      v-else
      class="flex w-full h-full gap-4 border-2 border-red-500"
    >
      <aside class="w-50 border-2 border-blue-500">
        Sidebar
      </aside>
      <div class="flex flex-col flex-1 w-full border-2 border-yellow-400 gap-4 p-4">
        <div
          class="flex-none flex justify-between items-center
          bg-white border border-gray-300 rounded-lg p-4"
        >
          <Profile :data-profile="profileStore.profileData" />
          <VButton
            text="Logout"
            :loading="false"
            @click="handleLogout"
          />
        </div>
        <div class="flex-1 overflow-hidden">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
