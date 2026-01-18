<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";

interface TableColumn {
  key: string;
  label: string;
}

interface TableRow {
  [key: string]: string;
}

interface Props {
  rows: TableRow[];
  heads: TableColumn[];
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
    class="relative h-full w-full border border-slate-400 rounded-lg shadow-sm
    bg-white overflow-hidden flex flex-col"
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
      <table class="min-w-full relative z-0">
        <thead class="bg-gray-200 sticky top-0 z-10 shadow-sm">
          <tr>
            <th
              v-for="head in heads"
              :key="head.key"
              class="px-6 py-3 text-center text-xs font-medium text-gray-700
                uppercase tracking-wider border-b border-slate-300 bg-gray-200"
            >
              {{ head.label }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-300">
          <tr
            v-for="(row, index) in rows"
            :key="row.id"
            class="hover:bg-blue-50 transition-colors"
            :class="{ 'bg-gray-50': index % 2 === 1 }"
          >
            <td
              v-for="head in heads"
              :key="head.key"
              class="px-6 py-4 text-sm text-gray-900 border-r border-slate-300 last:border-r-0"
            >
              <slot
                v-if="head.key === 'action'"
                name="action"
                :row="row"
              />
              <template v-else>
                {{ row[head.key] }}
              </template>
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
