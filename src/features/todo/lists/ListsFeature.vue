<script setup lang="ts">
import ContainerLists from "./components/ContainerLists.vue";
import HeaderPageLists from "./components/HeaderPageLists.vue";


</script>

<template>
  <Teleport
    to="#header-content"
    defer
  >
    <HeaderPageLists />
  </Teleport>
  <ContainerLists />
</template>
