<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import Profile from "@/features/user/components/Profile.vue";
import { useProfileStore } from "@/features/user/store/useProfileStore";
import { tokenManager } from "@/shared/api";
import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";

const router = useRouter();
const profileStore = useProfileStore();
const { loading, profileData } = storeToRefs(profileStore);
const { removeProfileData } = profileStore;

const handleLogout = () => {
  tokenManager.clearTokens();
  router.replace({ name: "signin", query: { mode: "signin" } });
  removeProfileData();
};
onMounted(() => {
  profileStore.requestProfileData();
});

</script>
<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <VLoader
      v-if="loading"
      color="white"
      size="w-[100px] h-[100px]"
    />
    <div v-else-if="profileData">
      <router-view />
      <VButton
        btn-color="green"
        text="Logout"
        @click="handleLogout"
      />
      <Profile :data-profile="profileData" />
    </div>
  </div>
</template>
