<script setup lang="ts">

import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <VLoader />
    <VInput />
    <VCard />
    <VButton />
  </div>
</template>

<style scoped>

</style>
