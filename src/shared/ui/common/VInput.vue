<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps<{
  placeholder?: string;
  label?: string;
  error?: string;
  type?: string;
  modelValue?: string;
}>();

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type || "text";
});


const emit = defineEmits(["update:modelValue"]);
</script>


<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="$slots.label"
      class="font-medium text-gray-700"
    >

      {{ props.label }}

    </label>
    <div class="relative">
      <input
        :type="inputType"
        class="border rounded-lg px-3 py-2 w-full
         focus:outline-none focus:ring-2 focus:ring-blue-500"
        :placeholder="props.placeholder"
        :value="props.modelValue"

        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
        @click="showPassword = !showPassword"
      >
        <span v-if="showPassword"> 🙉️</span>
        <span v-else>🙈</span>
      </button>
    </div>


    <p
      v-if="$slots.error"
      class="text-red-600 text-sm mb-2"
    >
      <slot name="error" />
    </p>
  </div>
</template>

