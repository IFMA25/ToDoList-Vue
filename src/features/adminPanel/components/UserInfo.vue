<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";

import {
  usePermissionsRequest,
  usePermissionsRoleRequest,
  useUpdateUserPermissions,
  useUpdateUserRole,
  useUserInfoRequest,
} from "../api/useAdminPanelRequests";
import { Permission, PermissionRole, UserResponse, UserRole } from "../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";
import { capitalizeFirstLetter } from "@/shared/utils";

const USER_ERROR_MSG = "User not found!";
const ROLE_ERROR_MSG = "Cannot change your own role!";
const REQUEST_ERROR = "Request failed!";
const UPDATE_SUCCESS_MSG = "User updated successfully!";
const USER_ROLES: UserRole[] = ["admin", "user"];

const route = useRoute();
const userId = String(route.params.id || "");
const permissionsAll = ref<Permission[]>([]);
const permissionRole = ref<PermissionRole>(null);
const userData = ref<UserResponse | null>(null);
const userPermissions = ref<Record<string, boolean>>({});
const selectedAllPermissions = ref<boolean>(false);

const userQuery = useUserInfoRequest(userId, {
  onError: (error) => {
    if (error.status === 404) {
      toast.error(USER_ERROR_MSG);
    }
  },
});

const permissionsQuery = usePermissionsRequest();

const permissionsRoleQuery = usePermissionsRoleRequest();

const updateRole = useUpdateUserRole(userId, {
  onError: (error) => {
    if (error.status === 403) {
      toast.error(ROLE_ERROR_MSG);
    }
  },
});

const updatePermissions = useUpdateUserPermissions(userId, {
  onError: (error) => {
    if (error.status === 404) {
      toast.error(USER_ERROR_MSG);
    }
  },
});

const initData = async () => {
  userData.value = null;
  permissionsAll.value = [];
  permissionRole.value = null;
  userPermissions.value = {};

  try {
    const [userResponse, permissionsResponse, rolesResponse] =
      await Promise.all([
        userQuery.execute(),
        permissionsQuery.execute(),
        permissionsRoleQuery.execute(),
      ]);

    if (userResponse) userData.value = userResponse;
    if (permissionsResponse) permissionsAll.value = permissionsResponse;
    if (rolesResponse) permissionRole.value = rolesResponse;
  } catch (error) {
    toast.error(REQUEST_ERROR);
    console.error(error);
  }
};

const updatedUserData = async () => {
  const activePermissions = Object.entries(userPermissions.value)
    .filter(([_, isActive]) => isActive)
    .map(([key]) => key);

  try {
    const [updatedDataWithPermissions, updatedDataWithRole] = await Promise.all(
      [
        updatePermissions.execute({ data: { permissions: activePermissions } }),
        updateRole.execute({ data: { role: userData.value?.role } }),
      ],
    );

    if (updatedDataWithRole && updatedDataWithPermissions)
      userData.value = updatedDataWithRole;

    toast.success(UPDATE_SUCCESS_MSG);
  } catch (err) {
    console.error("Update failed:", err);
  }
};

const handleChangeRole = (role: UserRole) => {
  if (!userData.value || !permissionRole.value) return;

  userData.value.role = role;

  const rolePermissions =
    role === "admin"
      ? permissionRole.value.ADMIN || []
      : permissionRole.value.USER || [];

  setPermissions(rolePermissions);
};

const handleSelectedPermissions = () => {
  if (!permissionRole.value) return;

  if (selectedAllPermissions.value) {
    selectedAllPermissions.value = false;
    setPermissions([]);
  } else {
    selectedAllPermissions.value = true;
    setPermissions(permissionRole.value.ADMIN || []);
  }
};

const setPermissions = (activePermissions: string[]) => {
  permissionsAll.value.forEach((p) => {
    userPermissions.value[p.value] = activePermissions.includes(p.value);
  });
};

const isLoading = computed(
  () =>
    !userData.value ||
    userQuery.loading.value ||
    permissionsQuery.loading.value ||
    permissionsRoleQuery.loading.value ||
    updateRole.loading.value ||
    updatePermissions.loading.value,
);

watch(
  () => userData.value?.permissions,
  (permissions) => {
    if (!permissions) return;
    setPermissions(permissions);
  },
  { immediate: true },
);

// или watch??

onMounted(() => {
  initData();
});
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
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold mb-4">
        Permissions for
        <span class="text-blue-600 font-extrabold">
          {{ userData?.name || userData?.email }}
        </span>
      </h2>
      <div class="flex justify-end gap-8">
        <VButton
          :text="selectedAllPermissions ? 'Clear selection' : 'Select all'"
          variant="default"
          @click="handleSelectedPermissions"
        />
        <VButton
          variant="default"
          :to="'/users'"
          text="Back to all users"
        />
      </div>
    </div>

    <form
      class="flex flex-col gap-6"
      @submit.prevent="updatedUserData"
    >
      <VDropdown placement="tf">
        <template #trigger="{ toggle }">
          <VButton
            type="button"
            :text="userData?.role"
            @click="toggle"
          />
        </template>

        <ul class="text-center cursor-pointer">
          <li
            v-for="role in USER_ROLES"
            :key="role"
            class="hover:bg-gray-100 py-1"
            @click="handleChangeRole(role)"
          >
            {{ capitalizeFirstLetter(role) }}
          </li>
        </ul>
      </VDropdown>
      <div class="grid grid-cols-3 gap-4">
        <VSwitch
          v-for="permission in permissionsAll"
          :id="`permission-${permission.key}`"
          :key="permission.key"
          v-model="userPermissions[permission.value]"
          variant="default"
          :label="permission.description"
        />
      </div>
      <div class="mx-auto">
        <VButton
          variant="default"
          type="submit"
          text="Save"
        />
      </div>
    </form>
  </div>
</template>
