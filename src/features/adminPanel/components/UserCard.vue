<script setup lang="ts">

defineProps<{
  title: string;
  subtitle?: string;
  date?: string;
}>();

</script>

<template>
  <div class="flex justify-between">
    <div>
      <h3 class="text-xl font-medium leading=[1.2] mb-2">
        {{ title }}
      </h3>
      <p class="text-secondary text-sm leading=[1.3]">
        {{ subtitle }}
      </p>
    </div>
    <p class="text-secondary text-xs leading=[1.1]">
      {{ $t('userInfo.since') }} <span class="capitalize">{{ date }}</span>
    </p>
  </div>
</template>
