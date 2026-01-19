<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useAdminRequest, useUserDeleteRequest } from "../api/useAdminPanelRequests";
import { RowData, UsersResponse } from "../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VTable, { TableColumn } from "@/shared/ui/common/VTable.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";


const { t } = useI18n();

const TABLE_HEADS: TableColumn<RowData>[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Created At" },
  { key: "action", label: "Action" },
];
const ACTIONS = ["Edit", "Delete"];
const ERROR_MSG = "Admin role required!";

const usersData = ref<UsersResponse | null>(null);
const confirmModal = ref<boolean>(false);
const selectedUserId = ref< string | null>(null);
const selectedUserName = ref< string | null>(null);
const search = ref<string>("");
let searchDebounce: ReturnType<typeof setTimeout> | undefined;

const router = useRouter();

const hasMore = computed(() => {
  return usersData.value?.pagination.hasMore;
});

const tableRows = computed<RowData[]>(() => {
  if(!usersData.value?.data) return [];

  return usersData.value?.data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));
});

const { execute, loading, error, data } = useAdminRequest({
  onSuccess: () => {
    usersData.value = {
      data: [...(usersData.value?.data || []), ...data.value.data],
      pagination: data.value.pagination,
    };
  },
  onError: () => {
    if (error.value.status === 403) {
      toast.error(ERROR_MSG);
    }
  },
});

const loadMore = () => {
  const pagination = usersData.value?.pagination;
  if (!pagination) return;

  const { limit, offset: currentOffset } = pagination;

  execute({
    params: {
      limit,
      offset: currentOffset + limit,
      q: search.value.trim() || undefined,
      // sort: sort.value,
      // order: order.value,
    },
  });
};

const deleteUser = useUserDeleteRequest(selectedUserId, {
  onSuccess: () => {
    const id = selectedUserId.value;
    if(!id || !usersData.value) return;

    usersData.value.data = usersData.value.data.filter(
      (user) => user.id !== id,
    );

    toast.success("User deleted successfully!");
  },
  onError: (err) => {
    if (err?.status === 403) {
      toast.error("Cannot delete your own account");
    }
  },
});

const handleDelete = async () => {
  if (!selectedUserId.value) return;
  await deleteUser.execute();
  selectedUserId.value = null;
  selectedUserName.value = null;
  confirmModal.value = false;
};

const handelAction = (rowData: RowData, action: string) => {
  if (action === "Edit") {
    router.push({ name: "usersInfo", params: { id: rowData.id } });
  } else if (action === "Delete") {
    selectedUserId.value = rowData.id;
    selectedUserName.value = rowData.name;
    confirmModal.value = true;
  }
};

const fetchUsers = (opts?: { reset?: boolean }) => {
  const reset = opts?.reset ?? false;
  const limit = usersData.value?.pagination.limit ?? 10;
  const offset = reset ? 0 : (usersData.value?.pagination.offset ?? 0);

  if (reset) usersData.value = null;

  execute({
    params: {
      limit,
      offset,
      q: search.value.trim() || undefined,
      // sort: sort.value,
      // order: order.value,
    },
  });
};


const closeConfirmModal = () => confirmModal.value = false;

const loadingTable = computed(() => loading.value || deleteUser.loading.value);

watch(search, () => {
  if (searchDebounce) clearTimeout(searchDebounce);

  searchDebounce = setTimeout(() => {
    fetchUsers({ reset: true });
  }, 400);
});

onBeforeUnmount(() => clearTimeout(searchDebounce));

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
    <VInput
      v-model="search"
      :placeholder="t('search.placeholder')"
      type="search"
      variant="search"
      icon-left="search"
    />
    <VTable
      :rows="tableRows"
      :heads="TABLE_HEADS"
      :loading="loadingTable"
      :has-more="hasMore"
      @load-more="loadMore"
    >
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
