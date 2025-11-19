<script setup lang="ts">
import { ref } from "vue";

type QA = {
  id?: number;
  title?: string;
  content?: string;
  icon?: string;
  description?: string;
};

type AccordionProps = {
  questionsAnswers?:QA[];
};

const props = defineProps<AccordionProps>();
const openItems = ref<number[]>([]);

const toggleItem = (id: number) => {
  const index = openItems.value.indexOf(id);
  if (index > -1) {
    openItems.value.splice(index, 1);
  } else {
    openItems.value.push(id);
  }
};

</script>

<template>
  <div>
    <div class="border rounded-lg p-14 bg-white shadow-sm w-full ">
      <div
        v-for="qa in props.questionsAnswers"
        :key="qa.id"
        class="border-b"
      >
        <button
          class="w-full text-left py-4 flex"
          @click="toggleItem(qa.id!)"
        >
          <div class="flex items-center w-full">
            <VueFeather
              :type="qa.icon"
              class=" h-5 w-5 text-blue-500 inline-block "
            />
            <span class="font-medium ml-4 flex-grow ">
              {{ qa.title }}
              <p class="text-gray-600 font-light">{{ qa.description }}</p>
            </span>

            <span>
              <VueFeather
                v-if="!openItems.includes(qa.id!)"
                type="arrow-down"
              />
              <VueFeather
                v-else
                type="arrow-up"
              />

            </span>
          </div>
        </button>
        <Transition name="fade">
          <div
            v-if="openItems.includes(qa.id!)"
            class="pb-4 text-gray-700"
          >
            {{ qa.content }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
