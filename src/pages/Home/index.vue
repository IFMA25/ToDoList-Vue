<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";


</script>

<template>
  Home Page
  <div class="mx-auto max-w-[300px]">
    <VButton
      text="Go to Admin Panel"
      :to="'/users'"
      variant="main"
    />
  </div>
</template>
