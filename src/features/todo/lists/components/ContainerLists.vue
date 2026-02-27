<script setup lang="ts">
import {
  computed,
  ref,
} from "vue";
import { useI18n } from "vue-i18n";


import { ListData } from "../types";
import EditListModal from "./EditListModal.vue";
import { useListsDataRequest, useUpdateLists } from "../api/useListsRequest";

import { useModal } from "@/shared/composables/useModal";
import { colorsList } from "@/shared/config/colorMap";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VDropdown from "@/shared/ui/common/dropdown/VDropdown.vue";
import { capitalizeFirstLetter } from "@/shared/utils";

const { t } = useI18n();

const actions = computed(() => [
  { key: "edit", label: t("lists.editList") },
  { key: "delete", label: t("lists.deleteList") },
]);

const listData = ref([]);
const selectedList = ref<ListData | null>(null);
const editListName = ref<string>("");
const editListColor = ref<string>(colorsList[0]);

const {
  open: openListEditModal,
  close: closeListEditModal,
} = useModal("listEditModal");
const {
  open: openListDeleteModal,
  // close: closeListDeleteModal,
} = useModal("listDeleteModal");


const {
  execute: fetchListsData,
  loading: fetchListsLoading,
  data: listsData,
} = useListsDataRequest({
  immediate: true,
  onSuccess: () => {
    listData.value = listsData.value.data;
    console.log(listsData.value.data);
  },
});

const {
  execute: updateSelectedList,
  loading: updateListLoading,
  data: updateListData,
} = useUpdateLists(() => selectedList.value?.id, {
  data: () => ({
    title: editListName.value,
    deadline: selectedList.value.deadline,
    hexColor: editListColor.value,
  }),
  onSuccess: () => {
    selectedList.value = updateListData.value;
    console.log("updateList: ", updateListData.value);
    fetchListsData();
    closeListEditModal();
  },
});

const handelAction = (list: ListData, action: string) => {
  if (action === "edit") {
    selectedList.value = list;
    console.log(list);
    editListName.value = list.title;
    editListColor.value = list.hexColor || colorsList[0];
    openListEditModal();
  }
  if (action === "delete") {
    selectedList.value = list;
    openListDeleteModal();
  }
};

const isLoading = computed(() =>
  fetchListsLoading.value ||
  updateListLoading.value,
);
</script>

<template>
  <EditListModal
    v-model:name="editListName"
    v-model:color="editListColor"
    :selected-list-data="selectedList"
    :loading="updateListLoading"
    @update-list="updateSelectedList"
  />
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm"
    >
      <VLoader
        color="primaryDark"
        size="h-[100px]"
      />
    </div>
  </Transition>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
    <VContainer
      v-for="data in listsData?.data"
      :key="data.id"
      :title-text="data.title"
      icon="circle"
      :color-icon="data.hexColor"
      class="relative w-full"
    >
      <template #default>
        <div class="flex gap-4">
          <p class="text-secondary">
            {{ data.totalTasks }} {{ t('lists.tasks') }}
          </p>
          <p class="text-muted">
            {{ data.completedTasks }} {{ t('lists.completed') }}
          </p>
        </div>
      </template>
      <template #container-actions>
        <div class="absolute top-2 right-2">
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
                v-for="action in actions"
                :key="action.key"
                :class="action.key === 'delete'
                  ? 'text-danger hover:text-dangerHover'
                  : 'hover:text-primaryBg'"
                @click="handelAction(data, action.key)"
              >
                {{ capitalizeFirstLetter(action.label) }}
              </li>
            </ul>
          </VDropdown>
        </div>
      </template>
    </VContainer>
  </div>
</template>
