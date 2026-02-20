<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
} from "vue";
import { useRoute } from "vue-router";


import { useUserInfoRequest } from "./api/useAdminPanelRequests";
import UserCard from "./components/UserCard.vue";
import { formatDate } from "./utils";
import { useProfileStore } from "../../shared/stores/useProfileStore";

import VTitle from "@/shared/ui/common/VTitle.vue";

const UserForm = defineAsyncComponent(() => import("./components/UserForm.vue"));
const OwnUserForm = defineAsyncComponent(() => import("./components/OwnUserForm.vue"));

const route = useRoute();
const profileStore = useProfileStore();
const userId = computed(() => {
  const id = route.query.id;
  return typeof id === "string" ? id : undefined;
});

const isAdminMode = computed(() => !!userId.value);

const { execute: refetchUser, loading: userInfoLoad, data: userInfoData }
= useUserInfoRequest(() => userId.value, {
  immediate: !!userId.value,
  watch: [userId],
});

const userData = computed(() => isAdminMode.value ? userInfoData.value : profileStore.profileData);
const isLoading = computed(() => isAdminMode.value ? userInfoLoad.value : profileStore.loading);
</script>

<template>
  <Teleport
    to="#header-content"
    defer
  >
    <UserCard
      :loading="isLoading"
      :title="userData?.name"
      :subtitle="userData?.email"
      :date="formatDate(userData?.createdAt, { month: 'long', year: 'numeric' })"
    />
  </Teleport>
  <VTitle
    :text="isAdminMode ? $t('userInfo.titleUserAcc') : $t('userInfo.titleOwnAcc')"
    class="mb-6"
  />
  <component
    :is="isAdminMode ? UserForm : OwnUserForm"
    :user-id="userId"
    :user-data="userData"
    @update-success="refetchUser"
  />
</template>
