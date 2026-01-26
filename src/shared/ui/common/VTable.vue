<script setup lang="ts" generic="T extends { id: string }">
import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";

export interface TableColumn<T> {
  key: keyof T | "action";
  label: string;
}

interface Props {
  rows: T[];
  heads: TableColumn<T>[];
  loading?: boolean;
  hasMore?: boolean;
}

const emit = defineEmits<{
  loadMore: [];
}>();

const {
  rows = [],
  heads = [],
  loading = false,
  hasMore = false,
} = defineProps<Props>();

</script>

<template>
  <div
    class="relative h-full w-full bg-white overflow-hidden flex flex-col"
  >
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loading"
        class="absolute inset-0 z-20 flex items-center justify-center
        bg-white/60 backdrop-blur-sm"
      >
        <VLoader
          color="primaryDark"
          size="h-[100px]"
        />
      </div>
    </Transition>
    <div
      class="overflow-auto w-full h-full flex flex-col transition-opacity duration-300"
      :class="{ 'pointer-events-none select-none': loading }"
    >
      <table class="min-w-full relative z-0 text-primary">
        <thead class="bg-subtle sticky top-0 z-10">
          <tr>
            <th
              v-for="head in heads"
              :key="String(head.key)"
              class="p-2 text-left font-semibold first:rounded-l-lg last:rounded-r-lg"
            >
              {{ head.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row) in rows"
            :key="row.id"
            class="border-b border-default last:border-b-0 hover:bg-default transition-colors"
          >
            <td
              v-for="(head, colIndex) in heads"
              :key="String(head.key)"
              class="pt-6 pb-2 text-sm"
              :class="[
                (colIndex + 1) % 2 === 0 ? 'text-toggle capitalize' : '',
                colIndex === 3 ? 'text-xs' : ''
              ]"
            >
              <slot
                v-if="head.key === 'action'"
                name="action"
                :row="row"
              />
              <slot
                v-else
                :name="`cell-${String(head.key)}`"
                :row="row"
              >
                {{ String(row[head.key as keyof T] ?? "") }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
      <VButton
        v-if="hasMore"
        class="mx-auto"
        text="Load More"
        variant="default"
        load-color="primaryDark"
        @click="emit('loadMore')"
      />
    </div>
  </div>
</template>
