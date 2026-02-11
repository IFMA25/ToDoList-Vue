<script setup lang="ts">

import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useUsersDataRequest } from "./api/useAdminPanelRequests";
import FilterTable from "./components/FilterTable.vue";
import { RoleOption, SortOption, User } from "./types";
import { formatDate } from "./utils";

import { useApiDelete } from "@/shared/composables/useApi";
import { useModal } from "@/shared/composables/useModal";
import VButton from "@/shared/ui/common/VButton.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";
import VModal from "@/shared/ui/modal/VModal.vue";
import VTable from "@/shared/ui/table/VTable.vue";
import { capitalizeFirstLetter } from "@/shared/utils";

const { t } = useI18n();

const TABLE_HEADS = computed(() => [
  { key: "member", label: t("table.tableHeads.member"), position: "text-left" },
  { key: "role", label: t("table.tableHeads.role"), position: "text-left", columnStyles: "text-toggle capitalize" },
  { key: "createdAt", label: t("table.tableHeads.createdAt"), position: "text-left" },
  { key: "action", label: t("table.tableHeads.action"), position: "text-center" },
]);

const ACTIONS = computed(() => [
  {
    key: "edit",
    label: t("usersList.userProfile"),
  },
  {
    key: "delete",
    label: t("usersList.removeUser"),
  },
]);

const ROLE_OPTIONS = computed<RoleOption[]>(() => [
  { label: t("table.filters.allRoles"), value: undefined },
  { label: t("table.filters.admins"), value: "admin" },
  { label: t("table.filters.users"), value: "user" },
]);

const SORT_OPTIONS = computed<SortOption[]>(() => [
  { key: "newestFirst", label: t("table.filters.newestFirst"), params: { sort: "createdAt", order: "desc" } },
  { key: "oldestFirst", label: t("table.filters.oldestFirst"), params: { sort: "createdAt", order: "asc" } },
  { key: "nameAsc", label: t("table.filters.nameAsc"), params: { sort: "name", order: "asc" } },
  { key: "nameDesc", label: t("table.filters.nameDesc"), params: { sort: "name", order: "desc" } },
]);

const DEFAULT_LIMIT = 20;

const selectedUser = ref<User | null>(null);
const selectedRole = ref<RoleOption>(ROLE_OPTIONS.value[0]);
const selectedSort = ref<SortOption>(SORT_OPTIONS.value[0]);

const modelSearch = ref<string>("");

const router = useRouter();
const { open: openDeleteModal, close: closeDeleteModal } = useModal("userDeleteModal");

const { execute, loading, data: usersData } = useUsersDataRequest({
  immediate: true,
  watch: [selectedRole, selectedSort, modelSearch],
  params: () => ({
    limit: usersData.value?.pagination.limit ?? DEFAULT_LIMIT,
    q: modelSearch.value.trim() || undefined,
    role: selectedRole.value?.value,
    sort: selectedSort.value.params.sort,
    order: selectedSort.value.params.order,
  }),
  debounce: 600,
});

const url = computed(() => `/users/${selectedUser.value?.id}`);

const { execute: deleteUser, loading: deletingLoading } = useApiDelete(url, {
  onSuccess: () => {
    execute();
    closeDeleteModal();
    toast.warning(t("usersList.msgDeleteSuccess"));
  },
});

const loadMore = () => {
  const currentLimit = usersData.value.pagination.limit + DEFAULT_LIMIT;
  execute({ params: { limit: currentLimit } });
};

const handelAction = (user: User, action: { key: string }) => {
  if (action.key === "edit") {
    router.push({ name: "usersInfo", params: { id: user.id } });
  }
  if (action.key === "delete") {
    selectedUser.value = user;
    openDeleteModal();
  }
};
</script>

<template>
  <VModal
    id="userDeleteModal"
    :show-close-button="false"
    title="Remove user"
    max-width="md"
  >
    <template #default>
      <p class="font-semibold mb-2">
        Are you sure you want to remove {{ selectedUser?.name }} ({{ selectedUser?.email }})?
      </p>
      <p class="text-xs">
        This action can’t be undone
      </p>
    </template>
    <template #footer>
      <VButton
        :text="$t('usersList.cancel')"
        variant="outline"
        @click="closeDeleteModal"
      />
      <VButton
        :text="$t('usersList.confirmRemove')"
        variant="danger"
        :loading="deletingLoading"
        @click="deleteUser()"
      />
    </template>
  </VModal>
  <div class="h-full flex items-center justify-center flex-col gap-6">
    <VTitle :text="$t('usersList.title')" />
    <VTable
      :rows="usersData?.data ?? []"
      :heads="TABLE_HEADS"
      :loading="loading"
      :pagination="usersData?.pagination"
      @load-more="loadMore"
    >
      <template #toolbar>
        <FilterTable
          v-model:search="modelSearch"
          v-model:role="selectedRole"
          v-model:sort="selectedSort"
          :options="{
            roleOptions: ROLE_OPTIONS,
            sortOptions: SORT_OPTIONS
          }"
        />
      </template>
      <template #cell-member="{ row }">
        <div class="flex flex-col leading-tight">
          <span class="mb-1">{{ row.name }}</span>
          <span class="text-xs text-secondary">{{ row.email }}</span>
        </div>
      </template>
      <template #cell-role="{ row }">
        <span :class="{ 'font-medium': row.role === 'admin' }">
          {{ t(`table.tableRoles.${row.role}`) }}
        </span>
      </template>
      <template #cell-createdAt="{ row }">
        <span class="text-xs text-secondary">{{ formatDate(row.createdAt) }}</span>
      </template>
      <template
        #cell-action="{ row }"
      >
        <VDropdown>
          <template #trigger="{toggle}">
            <VButton
              icon="actions-btn"
              icon-size="w-8 h-8"
              class="w-full justify-center text-primaryBg font-bold text-lg"
              @click="toggle"
            />
          </template>
          <ul class="cursor-pointer flex flex-col gap-2">
            <li
              v-for="action in ACTIONS"
              :key="action.key"
              :class="action.key === 'delete' && 'text-danger hover:text-dangerHover'"
              @click="handelAction(row, action)"
            >
              {{ capitalizeFirstLetter(action.label) }}
            </li>
          </ul>
        </VDropdown>
      </template>
    </VTable>
  </div>
</template>
