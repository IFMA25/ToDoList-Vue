<script setup lang="ts">
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import { useAuthMode } from "./composables/useAuthMode";

const{ pageMode, switchMode } =useAuthMode();

const page = {
  signin: SignIn,
  signup: SignUp,
};
</script>

<template>
  <component
    :is="page[pageMode]"
    @switch-mode="switchMode"
  />
</template>
