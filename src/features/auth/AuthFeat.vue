<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";

type Mode = "signin" | "signup";

const route = useRoute();
const router = useRouter();

const pageMode = computed((): Mode => {
  const mode = route.params.mode;
  if (mode === "signin" || mode === "signup") {
    return mode;
  }
  return "signin";
});

const switchTo = (mode: Mode) => {
  router.push({
    name: "auth",
    params: {
      mode,
    },
  });
};

</script>

<template>
  <div class="flex gap-2">
    <button @click="switchTo('signin')">
      Sign In
    </button>
    <button @click="switchTo('signup')">
      Sign Up
    </button>
  </div>
  <div>
    <SignIn v-show="pageMode === 'signin'" />
    <SignUp v-show="pageMode === 'signup'" />
  </div>
</template>
