<script setup lang="ts">
import { computed } from "vue";

import { ListData } from "../types";

import { useModal } from "@/shared/composables/useModal";
import { colorsList } from "@/shared/config/colorMap";
import VColorRadio from "@/shared/ui/colorRadioBtn/VColorRadio.vue";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VModal from "@/shared/ui/modal/VModal.vue";

const { close: closeListEditModal } = useModal("listEditModal");

const { selectedListData, loading } = defineProps<{
  selectedListData: ListData | null;
  loading: boolean;
}>();

const editListName = defineModel<string>("name");
const editListColor = defineModel<string>("color");

const emit = defineEmits(["updateList"]);

const isDataChanged = computed(() => {
  if (!selectedListData) return false;

  const isNameChanged = editListName.value !== selectedListData.title;
  const isColorChanged = editListColor.value !== (selectedListData.hexColor || colorsList[0]);

  return isNameChanged || isColorChanged;
});

</script>

<template>
  <VModal
    id="listEditModal"
    :title="$t('lists.editListModal.title')"
    max-width="md"
  >
    <template #default>
      <VInput
        v-model="editListName"
        :label="$t('lists.editListModal.labelName')"
        class="text-sm text-secondary font-medium leading-[1.2] mb-4"
      />
      <p class="text-sm text-secondary font-medium leading-[1.2] mb-2">
        {{ $t('lists.editListModal.labelColor') }}
      </p>
      <div class="flex gap-4">
        <VColorRadio
          v-for="color in colorsList"
          :key="color"
          v-model="editListColor"
          :color="color"
        />
      </div>
    </template>
    <template #footer>
      <VButton
        type="text"
        :text="$t('lists.cancel')"
        variant="outline"
        @click="closeListEditModal"
      />
      <VButton
        :text="$t('lists.editListModal.saveBtn')"
        variant="outline"
        :disabled="!isDataChanged"
        :loading="loading"
        load-color="text-disabled"
        @click="emit('updateList')"
      />
    </template>
  </VModal>
</template>
