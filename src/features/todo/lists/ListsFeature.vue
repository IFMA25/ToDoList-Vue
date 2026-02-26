<script setup lang="ts">
import { ref } from 'vue';

import { useListsDataRequest } from './api/useListsRequest';
import ContainerLists from './components/ContainerLists.vue';
import HeaderPageLists from './components/HeaderPageLists.vue';

const listData = ref([]);
const {data} = useListsDataRequest({
  immediate: true,
  onSuccess: () => {
    listData.value = data.value.data
    console.log(data.value.data)
  }
})
</script>
<template>
  <Teleport
    to="#header-content"
    defer
  >
    <HeaderPageLists />
  </Teleport> 
  <ContainerLists :data="listData"/>
</template>
