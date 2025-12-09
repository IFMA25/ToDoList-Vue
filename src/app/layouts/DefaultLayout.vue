<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import Profile from "@/features/user/components/Profile.vue";
import { useProfileStore } from "@/features/user/store/useProfileStore";
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
  <div class="min-h-screen flex p-8 bg-blue-900">
    <VLoader
      v-if="profileStore.loading"
      color="primaryDark"
      size="w-[100px] h-[100px]"
    />
    <div
      v-else
      class="border-2 border-red-500"
    >
      <div>
        Header
      </div>
      <aside>
        Sidebar
      </aside>
      <router-view />
      <VButton
        text="Logout"
        :loading="false"
        @click="handleLogout"
      />
      <Profile :data-profile="profileStore.profileData" />
      <footer>
        footer
      </footer>
    </div>
  </div>
</template>
