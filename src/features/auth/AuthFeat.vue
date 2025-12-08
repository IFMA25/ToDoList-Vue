<script setup lang="ts">
import { computed  } from "vue";
import { useRoute } from "vue-router";

import ActionAuth from "./components/ActionAuth.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";

type Mode = "signin" | "signup";

const route = useRoute();

const pageMode = computed((): Mode => {
  const mode = route.query.mode;
  if (mode === "signin" || mode === "signup") {
    return mode;
  }
  return "signin";
});
</script>

<template>
  <SignIn v-if="pageMode === 'signin'" />
  <SignUp v-if="pageMode === 'signup'" />
  <ActionAuth :page-mode="pageMode" />
</template>
