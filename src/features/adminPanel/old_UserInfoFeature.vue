<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";

import {
  usePermissionsRequest,
  usePermissionsRoleRequest,
  useUpdateUserPermissions,
  useUpdateUserRole,
  useUserInfoRequest,
} from "./api/useAdminPanelRequests";
import PermissionsControl from "./components/PermissionsControl.vue";
import UserCard from "./components/UserCard.vue";
import UserPermissions from "./components/UserPermissions.vue";
import { usePermissionsManager } from "./composables/usePermissionsManager";
import {
  Category,
  RoleOption,
} from "./types";
import {
  formatDate,
  sameArray,
} from "./utils";

import VButton from "@/shared/ui/common/VButton.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const { t } = useI18n();

const userRolesList = computed<RoleOption[]>(() => [
  { label: t("roles.admin"), value: "admin" },
  { label: t("roles.user"), value: "user" },
]);

const category = computed<Category[]> (() => [
  {
    key: "list",
    value: ["list", "all-lists"],
    label: t("userInfo.categoryList"),
  },
  {
    key: "tasks",
    value: ["task", "all-tasks"],
    label: t("userInfo.categoryTasks"),
  },
  {
    key: "user",
    value: ["users", "user", "roles", "permissions"],
    label: t("userInfo.categoryUser"),
  },
  {
    key: "analytics",
    value: ["analytics", "dashboard"],
    label: t("userInfo.categoryAnalytics"),
  },
]);

const route = useRoute();
const userId = String(route.params.id);

const userRole = ref<RoleOption | null>(null);

const { execute: permissionExecute, loading: permissionsLoad, data: permissionsData }
= usePermissionsRequest();

const {
  execute: roleExecute,
  loading: permissionsRoleLoad,
  data: permissionsRoleData,
} = usePermissionsRoleRequest();

const {
  userPermissions,
  setPermissions,
  getActivePermissions,
  areAllSelected,
  toggleAllPermissions,
} = usePermissionsManager(permissionsData);

const { loading: userInfoLoad, data: userInfoData } = useUserInfoRequest(() => userId, {
  immediate: true,
  onSuccess: async() => {
    try{
      await Promise.all([permissionExecute(), roleExecute()]);
      setPermissions(userInfoData.value.permissions);
      userRole.value = {
        label: t(`roles.${userInfoData.value.role}`),
        value: userInfoData.value.role,
      };
    } catch (error) {
      toast(error);
    }
  },
});

const {
  execute: updateUserPermissions,
  loading: updateUserPermissionsLoad,
  data: updateUserPermissionsData,
} = useUpdateUserPermissions(() => userId, {
  data: () => ({ permissions: getActivePermissions() }),
  onSuccess: () => {
    setPermissions(updateUserPermissionsData.value.permissions);
    userInfoData.value = updateUserPermissionsData.value;
  },
});

const {
  execute: updateUserRole,
  loading: updateUserRoleLoad,
  data: updateUserRoleData,
} = useUpdateUserRole(() => userId, {
  data: () => ({ role: (userRole.value.value) }),
  onSuccess: () => {
    userRole.value.value = updateUserRoleData.value.role;
    userInfoData.value = updateUserRoleData.value;
  },
});

const handleSubmit = async () => {
  if(isRoleChanged.value){
    await updateUserRole();
  }
  await updateUserPermissions();
};


const isLoading = computed(
  () =>
    userInfoLoad.value ||
    permissionsRoleLoad.value ||
    permissionsLoad.value,
);

const isUpdating = computed(() => updateUserPermissionsLoad.value || updateUserRoleLoad.value);

const isRoleChanged = computed (() => userRole.value?.value !== userInfoData.value?.role);

const isDataChanged = computed(() => {
  if (!userInfoData.value) return;
  const currentPermissions = getActivePermissions();
  const initialPermissions = [...userInfoData.value.permissions].sort();
  const isPermissionsChanged = !sameArray(currentPermissions, initialPermissions);

  return isRoleChanged.value || isPermissionsChanged;
});
</script>

<template>
  <Teleport
    to="#header-content"
    defer
  >
    <UserCard
      :loading="isLoading || !userInfoData"
      :title="userInfoData?.name"
      :subtitle="userInfoData?.email"
      :date="formatDate(userInfoData?.createdAt, { month: 'long', year: 'numeric' })"
    />
  </Teleport>
  <VTitle
    :text="$t('userInfo.title')"
    class="mb-6"
  />
  <form
    class="flex flex-col gap-6 p-6 border border-surface rounded-xl"
    @submit.prevent="handleSubmit()"
  >
    <PermissionsControl
      v-model:role="userRole"
      :role-options="userRolesList"
      :all-selected="areAllSelected"
      :loading="isLoading"
      :disabled="isUpdating"
      @update:all-selected="toggleAllPermissions"
      @update:role="setPermissions(permissionsRoleData[userRole.value.toUpperCase()])"
    />
    <UserPermissions
      v-model="userPermissions"
      :categories="category"
      :all-permissions="permissionsData"
      :loading="isLoading"
      :disabled="isUpdating"
    />
    <div class="ml-auto">
      <VButton
        type="submit"
        variant="primary"
        :text="$t('userInfo.saveBtnText')"
        :loading="isUpdating"
        :disabled="!isDataChanged || isUpdating || isLoading"
      />
    </div>
  </form>
</template>
