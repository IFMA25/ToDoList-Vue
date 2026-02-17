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
import ToolbarPermissions from "./components/ToolbarPermissions.vue";
import UserCard from "./components/UserCard.vue";
import UserPermissions from "./components/UserPermissions.vue";
import { Category, RoleOption } from "./types";
import { formatDate, sameArray } from "./utils";

import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const { t } = useI18n();

const USER_ROLES = computed<RoleOption[]>(() => [
  { label: t("roles.admin"), value: "admin" },
  { label: t("roles.user"), value: "user" },
]);

const CATEGORY = computed<Category[]> (() => [
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

const userPermissions = ref<Record<string, boolean>>({});
const userRole = ref<RoleOption | null>(null);

const { execute: permissionExecute, loading: permissionsLoad, data: permissionsData }
= usePermissionsRequest();

const {
  execute: roleExecute,
  loading: permissionsRoleLoad,
  data: permissionsRoleData,
} = usePermissionsRoleRequest();

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

const handleSubmit = () => {
  if(isRoleChanged.value){
    updateUserRole();
  }
  updateUserPermissions();
};

const handleChangeAllSelected = () => {
  const allPermissions = permissionsData.value.map(p => p.value);
  areAllSelected.value ? setPermissions([]) : setPermissions(allPermissions);
};

const setPermissions = (permissions: string[]) => {
  const permissionsMap: Record<string, boolean> = {};
  permissionsData.value.forEach((permission) => {
    permissionsMap[permission.value] = permissions.includes(permission.value);
  });
  userPermissions.value = permissionsMap;
};

const getActivePermissions = () =>
  Object.entries(userPermissions.value)
    .filter(([_, isActive]) => isActive)
    .map(([key]) => key)
    .sort();

const isLoading = computed(
  () =>
    userInfoLoad.value ||
    permissionsRoleLoad.value ||
    permissionsLoad.value ||
    updateUserPermissionsLoad.value ||
    updateUserRoleLoad.value,
);

const areAllSelected = computed(() => {
  const activeCount = Object.values(userPermissions.value).filter(v => v).length;
  return activeCount === permissionsData.value.length;
});

const isRoleChanged = computed (() => userRole.value?.value !== userInfoData.value?.role);

const isDataChanged = computed(() => {

  const currentPermissions = getActivePermissions();
  const initialPermissions = [...userInfoData.value.permissions].sort();
  const isPermissionsChanged = !sameArray(currentPermissions, initialPermissions);

  return isRoleChanged.value || isPermissionsChanged;
});

const labelCheckbox = computed(() =>
  areAllSelected.value ? t("userInfo.clear") : t("userInfo.selectAll"),
);
</script>

<template>
  <div
    v-if="isLoading"
    class="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm"
  >
    <VLoader
      color="primaryDark"
      size="h-[100px]"
    />
  </div>
  <div v-else>
    <!-- телепорт есть всегда -->
    <Teleport to="#header-content">
      <UserCard
        :title="userInfoData.name"
        :subtitle="userInfoData.email"
        :date="formatDate(userInfoData.createdAt, { month: 'long', year: 'numeric' })"
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
      <ToolbarPermissions
        v-model:role="userRole"
        :role-options="USER_ROLES"
        :label-checkbox="labelCheckbox"
        :all-selected="areAllSelected"
        @update:all-selected="handleChangeAllSelected"
        @update:role="setPermissions(permissionsRoleData[userRole.value.toUpperCase()])"
      />
      <UserPermissions
        v-model="userPermissions"
        :categories="CATEGORY"
        :all-permissions="permissionsData"
      />
      <div class="ml-auto">
        <VButton
          type="submit"
          variant="primary"
          :text="$t('userInfo.saveBtnText')"
          :disabled="!isDataChanged"
        />
      </div>
    </form>
  </div>
</template>
