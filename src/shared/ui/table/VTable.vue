<script setup lang="ts" generic="T extends { id: string }">
import VEmptyState from "./EmptyState.vue";
import LoadMoreButton from "./LoadMoreButton.vue";

import { Pagination } from "@/features/adminPanel/types";
import VLoader from "@/shared/ui/common/VLoader.vue";

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  position?: string;
  columnStyles?: string;
}

interface Props {
  rows: T[];
  heads?: TableColumn<T>[];
  loading?: boolean;
  pagination?: Pagination;
}

const {
  rows = [],
  heads = [],
  loading = false,
  pagination = undefined,
} = defineProps<Props>();

defineEmits<{
  "load-more": [currentLimit: number]
}>();
</script>

<template>
  <div class="h-full w-full  overflow-hidden flex flex-col bg-transparent">
    <div class="flex-none ">
      <slot name="toolbar" />
    </div>

    <div
      class="flex-1 overflow-auto relative w-full min-h-0 transition-opacity duration-300"
      :class="{ 'pointer-events-none select-none': loading }"
    >
      <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="loading"
          class="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm"
        >
          <VLoader
            color="primaryDark"
            size="h-[100px]"
          />
        </div>
      </Transition>
      <div
        v-if="!loading && rows.length === 0"
        class="py-16 px-4"
      >
        <slot name="emptyState">
          <VEmptyState
            :title="$t('table.emptyState.title')"
            :subtitle="$t('table.emptyState.subtitle')"
          />
        </slot>
      </div>
      <table
        v-else
        class="min-w-full text-primary leading-[1.3]"
      >
        <thead
          v-if="heads"
          class="bg-subtle sticky top-0 z-10"
        >
          <tr>
            <th
              v-for="head in heads"
              :key="String(head.key)"
              :class="[`p-2 font-semibold first:rounded-l-lg last:rounded-r-lg`, head.position]"
            >
              {{ head.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b border-default last:border-b-0 hover:bg-default transition-colors"
          >
            <td
              v-for="head in heads"
              :key="String(head.key)"
              class="pt-6 pb-2 text-sm"
              :class="[head.columnStyles, head.position]"
            >
              <slot
                :name="`cell-${String(head.key)}`"
                :row="row"
              >
                {{ String(row[head.key as keyof T] ?? "") }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="pagination && pagination.hasMore">
        <slot
          v-if="pagination"
          name="pagination"
        />
        <LoadMoreButton @load-more="$emit('load-more', pagination.limit)" />
      </div>
    </div>
  </div>
</template>
