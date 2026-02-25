<script setup lang="ts">
import { computed } from "vue";
import {
  useRoute,
  useRouter,
} from "vue-router";

import { useProfileStore } from "@/shared/stores/useProfileStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VToaster from "@/shared/ui/toaster/VToaster.vue";
import Header from "@/widgets/Header.vue";
import Sidebar from "@/widgets/sidebar/Sidebar.vue";

const profileStore = useProfileStore();
const router = useRouter();
const route = useRoute();

const navItems = computed(() => {
  return router.getRoutes()
    .filter(route => {
      const isVisibleInMenu = route.meta.showInMenu !== false;
      const hasPermission = route.meta.permission
        ? profileStore.hasAccess(route.meta.permission)
        : true;
      return isVisibleInMenu && hasPermission;
    })
    .map(route => ({
      icon: route.meta.iconMenu,
      text: route.meta.titleMenu,
      to: route.path,
    }));
});



const showHeader = computed(() => route.meta.showHeader !== false);
const parentLink = computed(() => {
  if (route.meta.parent && route.query.id) {
    return route.meta.parent;
  }
  return null;
});


</script>

<template>
  <div class="h-full flex justify-center items-center">
    <VLoader
      v-if="profileStore.loading"
      color="primaryDark"
      size="w-[100px] h-[100px]"
    />
    <div
      v-else
      class="flex w-full h-full"
    >
      <Sidebar :nav-items="navItems" />
      <VToaster />
      <div
        id="actions"
        class="mb-6 min-h-[40px]"
      />
      <div class="flex-1 px-12 py-6">
        <div
          v-if="parentLink"
          class="inline-block mb-6"
        >
          <VButton
            variant="navItem"
            :to="parentLink.to"
            :text="$t(parentLink.textKey)"
            icon="chevron-left"
          />
        </div>
        <Header
          v-if="showHeader"
          class="mb-6"
        />
        <router-view />
      </div>
    </div>
  </div>
</template>
