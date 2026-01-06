<script setup lang="ts">
interface TableColumn {
  key: string;
  label: string;
}

interface TableRow {
  [key: string]: string;
}

const props = defineProps<{
  rows?: TableRow[];
  heads?: TableColumn[];
}>();
</script>

<template>
  <div
    class="h-full w-full border border-slate-400 rounded-lg shadow-sm
    bg-white overflow-hidden flex flex-col"
  >
    <div class="flex-1 overflow-auto">
      <table class="min-w-full">
        <thead class="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th
              v-for="head in props.heads"
              :key="head.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-700
                uppercase tracking-wider border-b border-slate-300 bg-gray-200"
            >
              {{ head.label }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-300">
          <tr
            v-for="(row, index) in props.rows"
            :key="row.id"
            class="hover:bg-blue-50 transition-colors"
            :class="{ 'bg-gray-50': index % 2 === 1 }"
          >
            <td
              v-for="head in props.heads"
              :key="head.key"
              class="px-6 py-4 text-sm text-gray-900 border-r border-slate-300 last:border-r-0"
            >
              {{ row[head.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
