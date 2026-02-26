<script setup lang="ts">
import { ref } from "vue";

import { useModal } from "@/shared/composables/useModal";
import { colorsList } from "@/shared/config/colorMap";
import VColorRadio from "@/shared/ui/colorRadioBtn/VColorRadio.vue";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VModal from "@/shared/ui/modal/VModal.vue";

const { close: closeListEditModal } = useModal("listEditModal");

const editListName = ref<string>("");
const selectedListColor = ref<string>(colorsList[0]);

</script>

<template>
  <VModal
    id="listEditModal"
    :title="$t('lists.editListModal.title')"
    max-width="md"
  >
    <template #default>
      <VInput
        v-modal="editListName"
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
          v-model="selectedListColor"
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
      />
    </template>
  </VModal>
</template>
