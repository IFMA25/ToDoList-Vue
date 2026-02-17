<script setup lang="ts">
defineProps<{
  open: boolean;
  title: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();
</script>

<template>
  <Teleport to="#modals">
    <div
      v-if="open"
      class="fixed inset-0 z-[999] flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/40"
        @click="emit('closeModal')"
      />
      <div
        class="relative z-10 w-[420px] rounded-lg bg-white p-4"
        role="dialog"
        aria-modal="true"
      >
        <button
          class="flex justify-center items-center ml-auto p-3 bg-transparent"
          @click="emit('closeModal')"
        >
          <VueFeather type="x" />
        </button>
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
        <div class="mt-4">
          <slot />
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <slot name="action" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
