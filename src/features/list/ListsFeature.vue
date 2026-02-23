<script setup lang="ts">
import VInput from '@/shared/ui/common/VInput.vue';
import VTitle from '@/shared/ui/common/VTitle.vue';
import VModal from '@/shared/ui/modal/VModal.vue';
</script>

<template>
    <VModal
    id="createNewList"
    :title="$t('lists.createListModal.title')"
    max-width="md"
  >
    <template #default>
      <VInput :label="$t('lists.createListModal.labelName')"/>
    </template>
    <template #footer>
      <VButton
        :text="$t('usersList.removeUserModal.cancel')"
        variant="outline"
        @click="closeDeleteModal"
      />
      <VButton
        :text="$t('usersList.removeUserModal.confirmRemove')"
        variant="danger"
        :loading="deletingLoading"
        @click="deleteUser()"
      />
    </template>
  </VModal>
  <div class="h-full flex flex-col gap-6">
    <VTitle :text="$t('usersList.title')" />
</template>
