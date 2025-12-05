<script setup lang="ts">
import { Profile } from "@/shared/api/types";

const props = defineProps<{
  dataProfile: Profile,
}>();
</script>

<template>
  <div class="border p-4 rounded shadow-md bg-slate-400">
    <p>{{ props.dataProfile.name }}</p>
    <p>{{ props.dataProfile.email }}</p>
    <p v-if="props.dataProfile.role === 'admin'">
      {{ props.dataProfile.role }}
    </p>
  </div>
</template>
