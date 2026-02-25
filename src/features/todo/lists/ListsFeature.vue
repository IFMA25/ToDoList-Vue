<script setup lang="ts">
import HeaderPageLists from "./components/HeaderPageLists.vue";
</script>
<template>
  <Teleport
    to="#header-content"
    defer
  >
    <HeaderPageLists />
  </Teleport>
</template>
