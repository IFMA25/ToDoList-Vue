<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useAdminRequest, useUserDeleteRequest } from "../api/useAdminPanelRequests";
import { RowData, UsersResponse } from "../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VSelect from "@/shared/ui/common/VSelect.vue";
import VTable, { TableColumn } from "@/shared/ui/common/VTable.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";

const { t } = useI18n();

type SortKey = "createdAt" | "name";
type SortOrder = "asc" | "desc";

const TABLE_HEADS: TableColumn<RowData>[] = [
  { key: "member", label: "Member" },
  // { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Registered" },
  { key: "action", label: "" },
];

const ACTIONS = ["Edit", "Delete"];
const ERROR_MSG = "Admin role required!";

const OPTIONS_ROLE = ["All roles", "Admins", "Users"];
const OPTIONS_SORT = ["Newest first", "Oldest first", "Name A-Z", "Name Z-A"];
const LIMIT = 20;

const usersData = ref<UsersResponse | null>(null);
const confirmModal = ref<boolean>(false);
const selectedUserId = ref< string | null>(null);
const selectedUserName = ref< string | null>(null);
const search = ref<string>("");
const modelSelectRole = ref<string>("All roles");
const modelSelectSort = ref<string>("Newest first");

const router = useRouter();

const { execute, loading, error } = useAdminRequest({
  onError: () => {
    if (error.value.status === 403) {
      toast.error(ERROR_MSG);
    }
  },
});

const loadMore = async() => {
  const pagination = usersData.value?.pagination;
  if (!pagination) return;

  const { sort, order } = sortParams.value;

  const limit = pagination.limit ?? LIMIT;
  const offset = pagination.offset + limit;

  const response = await execute({
    params: {
      limit: limit,
      offset: offset,
      q: search.value.trim() || undefined,
      role: roleFilter.value,
      sort,
      order,
    },
  });
  if (!response) return;

  addUsersData(response, true);
};

const deleteUser = useUserDeleteRequest(selectedUserId, {
  onSuccess: () => {
    selectedUserId.value = null;
    selectedUserName.value = null;
    confirmModal.value = false;
    toast.success("User deleted successfully!");
  },
  onError: (err) => {
    if (err?.status === 403) {
      toast.error("Cannot delete your own account");
    }
  },
});

const fetchUsers = async () => {
  usersData.value = null;

  const { sort, order } = sortParams.value;

  const response = await execute({
    params: {
      limit: LIMIT,
      offset: 0,
      q: search.value.trim() || undefined,
      role: roleFilter.value,
      sort,
      order,
    },
  });

  if (!response) return;
  addUsersData(response, false);
};


const handleDelete = async () => {
  if (!selectedUserId.value) return;
  await deleteUser.execute();
  await fetchUsers();
};

const handelAction = (rowData: RowData, action: string) => {
  if (action === "Edit") {
    router.push({ name: "usersInfo", params: { id: rowData.id } });
  } else if (action === "Delete") {
    selectedUserId.value = rowData.id;
    selectedUserName.value = rowData.member.name;
    confirmModal.value = true;
  }
};

const addUsersData = (response: UsersResponse, append: boolean) => {
  usersData.value = {
    data: append ? [...(usersData.value?.data ?? []), ...response.data] : response.data,
    pagination: response.pagination,
  };
};

const closeConfirmModal = () => confirmModal.value = false;

const hasMore = computed(() => usersData.value?.pagination.hasMore ?? false);

const tableRows = computed<RowData[]>(() => {
  if(!usersData.value?.data) return [];

  return usersData.value?.data.map((user) => ({
    id: user.id,
    member: {
      name: user.name,
      email: user.email,
    },
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));
});

const loadingTable = computed(() => loading.value);

const roleFilter = computed(() => {
  switch (modelSelectRole.value) {
    case "Admins": return "admin";
    case "Users": return "user";
    default: return undefined;
  }
});

const sortParams = computed<{ sort: SortKey; order: SortOrder }>(() => {
  switch (modelSelectSort.value) {
    case "Oldest first":
      return { sort: "createdAt", order: "asc" };
    case "Name A-Z":
      return { sort: "name", order: "asc" };
    case "Name Z-A":
      return { sort: "name", order: "desc" };
    case "Newest first":
    default:
      return { sort: "createdAt", order: "desc" };
  }
});

const debouncedFetchUsers = useDebounceFn(() => fetchUsers(), 800);
watch(search, debouncedFetchUsers);

watch([modelSelectRole, modelSelectSort], () => fetchUsers());

onMounted(() => fetchUsers());
</script>

<template>
  <VModal
    :open="confirmModal"
    :title="`Are you sure you want to delete ${selectedUserName ?? 'user'}?`"
    @close-modal="closeConfirmModal"
  >
    <template #action>
      <VButton
        text="Cancel"
        variant="default"
        @click="closeConfirmModal"
      />
      <VButton
        text="Delete"
        variant="default"
        :loading="deleteUser.loading.value"
        @click="handleDelete()"
      />
    </template>
  </VModal>
  <div class="h-full flex items-center justify-center flex-col gap-6">
    <div class="flex items-center gap-6 self-start">
      <VInput
        v-model="search"
        :placeholder="t('search.placeholder')"
        type="search"
        variant="search"
        icon-left="search"
      />
      <VSelect
        id="role-select"
        v-model="modelSelectRole"
        label-text="Role"
        :options="OPTIONS_ROLE"
        :close-on-select="true"
        placeholder="Role"
        class="w-[9.6rem]"
      />
      <VSelect
        id="sort-select"
        v-model="modelSelectSort"
        label-text="Sort by"
        :options="OPTIONS_SORT"
        :close-on-select="true"
        class="w-[13rem]"
      />
    </div>

    <VTable
      :rows="tableRows"
      :heads="TABLE_HEADS"
      :loading="loadingTable"
      :has-more="hasMore"
      @load-more="loadMore"
    >
      <template #cell-member="{ row }">
        <div class="flex flex-col leading-tight">
          <span class="font-medium text-slate-900">{{ row.member.name }}</span>
          <span class="text-xs text-slate-500">{{ row.member.email }}</span>
        </div>
      </template>
      <template
        #action="{ row }"
      >
        <VDropdown placement="tf">
          <template #trigger="{toggle}">
            <VButton
              text="..."
              variant="action"
              @click="toggle"
            />
          </template>
          <ul class="text-center cursor-pointer flex flex-col gap-2">
            <li
              v-for="action in ACTIONS"
              :key="action"
              @click="handelAction( row, action)"
            >
              {{ action }}
            </li>
          </ul>
        </VDropdown>
      </template>
    </VTable>
  </div>
</template>
