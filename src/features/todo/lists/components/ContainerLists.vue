<script setup lang="ts">
import VDropdown from '@/shared/ui/common/dropdown/VDropdown.vue';
import VButton from '@/shared/ui/common/VButton.vue';
import VContainer from '@/shared/ui/common/VContainer.vue';
import { capitalizeFirstLetter } from '@/shared/utils';

import { ListsData } from '../types';

const {data: responseListsData} =defineProps<{
  data: ListsData[];
}>();
</script>
<template>
  <div class="flex flex-wrap mr-[-12px] ml-[-12px] gap-y-6">
    <VContainer  
    v-for="data in responseListsData" 
    :titleText="data.title"
    class="w-[calc(100%/3-24px)] mx-3"
  >
  <template #default>
    <div class="flex gap-4">
      <p class="text-secondary">{{ data.totalTasks }}</p>
      <p class="text-muted">{{ data.completedTasks }}</p>
    </div>
  </template>
  <template #container-actions>
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
              :class="action.key === 'delete' && 'text-danger hover:text-dangerHover'"
              @click="handelAction(row, action.key)"
            >
              {{ capitalizeFirstLetter(action.label) }}
            </li>
          </ul>
        </VDropdown>
  </template>
  </VContainer>
  </div>
</template>
