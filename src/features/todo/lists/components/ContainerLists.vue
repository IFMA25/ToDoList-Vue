<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import { useI18n } from 'vue-i18n';

import { useModal } from '@/shared/composables/useModal';
import VDropdown from '@/shared/ui/common/dropdown/VDropdown.vue';
import VButton from '@/shared/ui/common/VButton.vue';
import VContainer from '@/shared/ui/common/VContainer.vue';
import { capitalizeFirstLetter } from '@/shared/utils';

import { ListData } from '../types';
import EditListModal from './EditListModal.vue';

const { t } = useI18n();

const actions = computed(() => [
  { key: "edit", label: t("lists.editList") },
  { key: "delete", label: t("lists.deleteList") },
]);

const { listsData } =defineProps<{
  listsData: ListData[];
}>();
const selectedList = ref<ListData | null>(null);

const { open: openListEditModal } = useModal("listEditModal");
const { open: openListDeleteModal, close: closeListDeleteModal } = useModal("listEditModal");

const handelAction = (list: ListData, action: string) => {
  if (action === "edit") {
    selectedList.value = list;
    openListEditModal();
  }
  if (action === "delete") {
    selectedList.value = list;
    openListDeleteModal();
  }
};
</script>

<template>
  <EditListModal />

  <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
    <VContainer
      v-for="data in listsData"
      :key="data.id"
      :title-text="data.title"
      icon="circle"
      :color-icon="data.hexColor"
      class="relative relative w-full"
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
