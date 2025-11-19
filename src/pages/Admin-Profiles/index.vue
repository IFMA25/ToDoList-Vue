<script setup lang="ts">

import { ref } from "vue";

import VAccordion from "@/shared/ui/common/VAccordion.vue";
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import VTable from "@/shared/ui/common/VTable.vue";
// import { filters } from "@/shared/utils/filters";

// const {
//   filterByName,
//   filterByEmail,
//   filterByPhone,
//   filterByRole,
// } = filters();

const selectedValues = ref<typeof options>([]);

const columns = [
  { label: "ID", field: "id" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Phone", field: "phone" },
  { label: "Role", field: "role" },
  { label: "Status", field: "status" },
];

const mockProfiles = [
  { id: 1, name: "John Doe", email: "johndoe@gmail.com", phone: "123-456-7890", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "janesmith@yahoo.com", phone: "987-654-3210", role: "User", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@mail.com", phone: "555-123-4567", role: "Moderator", status: "Active" },
  { id: 4, name: "Bob Brown", email: "bob.brown@hotmail.com", phone: "444-987-6543", role: "User", status: "Active" },
  { id: 5, name: "Charlie Davis", email: "charlie.davis@gmail.com", phone: "333-222-1111", role: "Developer", status: "Inactive" },
  { id: 6, name: "Diana Evans", email: "diana.evans@outlook.com", phone: "222-333-4444", role: "User", status: "Active" },
  { id: 7, name: "Ethan Wilson", email: "ethan.wilson@gmail.com", phone: "111-222-3333", role: "Moderator", status: "Active" },
  { id: 8, name: "Fiona Taylor", email: "fiona.taylor@mail.com", phone: "666-777-8888", role: "Developer", status: "Inactive" },
  { id: 9, name: "George Harris", email: "george.harris@yahoo.com", phone: "999-888-7777", role: "Admin", status: "Active" },
  { id: 10, name: "Hannah Clark", email: "hannah.clark@gmail.com", phone: "555-666-7777", role: "Developer", status: "Active" },
];
const options = [
  { id: 1, name: "Filter by name" },
  { id: 2, name: "Filter by email" },
  { id: 3, name: "Filter by phone" },
  { id: 4, name: "Filter by role" },
];
// const roles = ["Admin", "User", "Moderator", "Developer"];

let filteredProfiles = mockProfiles;

const questionsAnswers = [
  {
    id: 1,
    title: "How to use the admin profiles page?",
    description: "detailed guide",
    content: "You can use the admin profiles page to manage user profiles," +
        " filter them using the multi-select dropdown, and view details in the table below.",
    icon: "info",
  },
  {
    id: 2,
    title: "Can I add new profiles from this page?",
    description: "adding profiles",
    content: "No, the admin profiles page is primarily for viewing and filtering existing profiles." +
        " To add new profiles, please use the designated user management section.",
    icon: "user-plus",
  },
  {
    id: 3,
    title: "Is the multi-select dropdown taggable?",
    description: "custom tags",
    content: "Yes, the multi-select dropdown allows you to add custom tags in addition to selecting from the predefined options.",
    icon: "check-circle",
  },
];


</script>

<template>
  <div class="mb-6">
    <VMultiSelect
      id="tagging"
      v-model="selectedValues"
      label="Filters"
      :options="options"
      label-key="name"
      track-key="id"
      placeholder="Виберіть опції"
      multiple
      taggable
    />
  </div>

  <VTable
    :columns="columns"
    :data="filteredProfiles"
  />
  <div class="mt-6">
    <VAccordion
      :questions-answers="questionsAnswers"
    />
  </div>
</template>

<style scoped>

</style>
