<script setup lang="ts">
import { ref } from "vue";

import LogOut from "@/features/auth/components/LogOut.vue";
import VButton from "@/shared/ui/common/VButton.vue";
import { capitalizeFirstLetter } from "@/shared/utils";

interface Props {
  menuItem:any[];
}

const {
  menuItem = [],
} = defineProps<Props>();


const isOpen = ref(true);

const toggle = () => { isOpen.value = !isOpen.value; };
</script>

<template>
  <aside
    class="relative w-[25%] bg-sidebarBg text-secondaryText transition-all duration-300"
    :class="isOpen ? 'w-[25%]' : 'w-[5%]'"
  >
    <!-- фигня с стилями двоять в тулзах -->
    <VButton
      variant="nav"
      icon="icon-chevron-up"
      class="absolute top-6 right-6 z-10"
      :class="isOpen ? '-rotate-90' : 'rotate-90'"
      @click="toggle"
    />
    <nav class="h-full bg-sidebarOverlay border-2 border-transparent rounded-r-2xl">
      <ul
        class="sidebar h-full relative flex flex-col gap-4 border-2 border-transparent
        rounded-r-2xl px-6 pb-6 pt-20"
      >
        <li
          v-for="item in menuItem"
          :key="item"
        >
          <VButton
            :text="capitalizeFirstLetter(item.text)"
            :icon="item.icon"
            :to="item.to"
            variant="nav"
            :collapsed="!isOpen"
            :class="isOpen ? 'justify-start' : 'justify-center gap-0'"
          />
        </li>
        <li class="mt-auto">
          <LogOut :collapsed="!isOpen" />
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  background: linear-gradient(180deg, rgb(16, 22, 45) 0%, rgb(32, 43, 65) 100%);
}

.sidebar::before,
.sidebar::after {
  content: "";
  @apply absolute inset-0 pointer-events-none bg-no-repeat;
  background-size: 100% 100%;
}

.sidebar::before {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.015) 51.81%, rgba(0, 0, 0, 0) 68.99%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 85.25%, rgba(74, 118, 255, 0.0875) 100%);
}

.sidebar::after {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0%, rgba(0, 0, 0, 0) 6.88%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 86.96%, rgba(74, 118, 255, 0.0525) 100%);
}
</style>
