<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import {
  usePermissionsRequest,
  usePermissionsRoleRequest,
  useUpdateUserPermissions,
  // useUpdateUserRole,
  useUserInfoRequest,
} from "./api/useAdminPanelRequests";
// import { Permission, PermissionRole, UserResponse, UserRole } from "./types";
import { UserRole } from "./types";
// import { sameArray } from "./utils";

import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";
import { capitalizeFirstLetter } from "@/shared/utils";


// type SubmitMode = "none" | "permissions" | "role";

// const USER_ERROR_MSG = "User not found!";
// const ROLE_ERROR_MSG = "Cannot change your own role!";
// const REQUEST_ERROR = "Request failed!";
// const UPDATE_SUCCESS_MSG = "User updated successfully!";
const USER_ROLES: UserRole[] = ["admin", "user"]; //label value

const route = useRoute();
const userId = String(route.params.id);

const userPermissions = ref<Record<string, boolean>>({});

// const submitMode = ref<SubmitMode>("none");

const selectedAllPermissions = ref<boolean>(false);

// const isUpdating = ref<boolean>(false);

const { loading: permissionsLoad, data: permissionsData } = usePermissionsRequest({
  immediate: true,
  onSuccess: () => { console.log(permissionsData);},
});

const {
  loading: permissionsRoleLoad,
  // data: permissionsRoleData
} = usePermissionsRoleRequest({
  immediate: true,
});

const { loading: userInfoLoad, data: userInfoData } = useUserInfoRequest(() => userId, {
  immediate: true,
  onSuccess: () => {
    setPermissions(userInfoData.value.permissions);
  },
});

// const updatedRole = useUpdateUserRole(userId);

const getActivePermissions = () =>
  Object.entries(userPermissions.value)
    .filter(([_, isActive]) => isActive)
    .map(([key]) => key)
    .sort();

const {
  execute: updateUserPermissions,
  loading: updateUserPermissionsLoad,
  data: updateUserPermissionsData,
} = useUpdateUserPermissions(() => userId, {
  data: () => ({ permissions: getActivePermissions() }),
  onSuccess: () => {
    setPermissions(updateUserPermissionsData.value.permissions);
  },
});



// const updatedUserData = async () => {
//   if (!userData.value) return;

//   setSubmitMode();

//   if (submitMode.value === "none") return;

//   const activePermissions = getActivePermissions();

//   isUpdating.value = true;
//   try {
//     if (submitMode.value === "permissions") {
//       const updateUserData = await updatePermissions.execute({
//         data: { permissions: activePermissions },
//       });

//       responseData(updateUserData);
//     }

//     if (submitMode.value === "role") {
//       const updateWithRole = await updatedRole.execute({
//         data: { role: userData.value.role },
//       });

//       responseData(updateWithRole);

//       const updateWithPermissions = await updatePermissions.execute({
//         data: { permissions: activePermissions },
//       });

//       responseData(updateWithPermissions);
//     }
//     submitMode.value = "none";
//     // toast.success(UPDATE_SUCCESS_MSG);
//     return;
//   } catch (err) {
//     // toast.error(REQUEST_ERROR);
//     console.error("Update failed:", err);
//   } finally{
//     isUpdating.value = false;
//   }
// };

// const handleChangeRole = (role: UserRole) => {
//   userData.value.role = role; // нельзя, все с бека

//   const rolePermissions =
//     role === "admin"
//       ? permissionRole.value.ADMIN
//       : permissionRole.value.USER;

//   setPermissions(rolePermissions);
//   setSubmitMode();
// };

// const handleSelectedPermissions = () => {
//   if (!permissionRole.value) return;

//   if (selectedAllPermissions.value) {
//     selectedAllPermissions.value = false;
//     setPermissions([]);
//   } else {
//     selectedAllPermissions.value = true;
//     setPermissions(permissionRole.value.ADMIN || []);
//   }

//   setSubmitMode();
// };

// const setSubmitMode = () => {
//   if (!userData.value || !responseUserData.value) {
//     submitMode.value = "none";
//     return;
//   }

//   const roleChanged = userData.value.role !== responseUserData.value.role;

//   const currentPermissions = getActivePermissions();
//   const basePermissions = [...(responseUserData.value.permissions ?? [])].sort();
//   const permissionsChanged = !sameArray(currentPermissions, basePermissions);

//   if (roleChanged) submitMode.value = "role";
//   else if (permissionsChanged) submitMode.value = "permissions";
//   else submitMode.value = "none";
// };



const setPermissions = (permissions: string[]) => {
  const permissionsMap: Record<string, boolean> = {};
  permissionsData.value.forEach((permission) => {
    permissionsMap[permission.value] = permissions.includes(permission.value);
  });
  userPermissions.value = permissionsMap;
};



// const responseData = (data: UserResponse) => {
//   userData.value = data;
//   responseUserData.value = structuredClone(data);
//   setPermissions(data.permissions ?? []);
// };

const isLoading = computed(
  () =>
    userInfoLoad.value ||
    permissionsRoleLoad.value ||
    permissionsLoad.value ||
    updateUserPermissionsLoad.value,
);

// const currentRole = computed(() => userData.value?.role ?? "");

// watch(
//   userPermissions,
//   () => setSubmitMode(),
//   { deep: true },
// );

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
      <VTitle
        text="Permissions for"
        class="mb-4"
      >
        <template #default>
          <span class="text-blue-600 font-extrabold">
            {{ userInfoData?.name || userInfoData?.email }}
          </span>
        </template>
      </VTitle>
      <div class="flex justify-end gap-8">
        <VButton
          :text="selectedAllPermissions ? 'Clear selection' : 'Select all'"
          variant="default"
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
      @submit.prevent="updateUserPermissions()"
    >
      <VDropdown placement="tf">
        <template #trigger="{ toggle }">
          <VButton
            type="button"
            :text="userInfoData.role"
            @click="toggle"
          />
        </template>

        <ul class="text-center cursor-pointer">
          <li
            v-for="role in USER_ROLES"
            :key="role"
            class="hover:bg-gray-100 py-1"
          >
            {{ capitalizeFirstLetter(role) }}
          </li>
        </ul>
      </VDropdown>
      <div class="grid grid-cols-3 gap-4">
        <VSwitch
          v-for="permission in permissionsData"
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
