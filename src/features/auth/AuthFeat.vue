<script setup lang="ts">
import { computed  } from "vue";
import { useRoute, useRouter } from "vue-router";

import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";

const SIGN_IN = "Login";
const SIGN_UP = "Create account";
const SIGNIN_TEXT = "Don't have an account?";
const SIGNUP_TEXT = "Already have an account?";

type Mode = "signin" | "signup";

const route = useRoute();
const router = useRouter();

const pageMode = computed((): Mode => {
  const mode = route.query.mode;
  if (mode === "signin" || mode === "signup") {
    return mode;
  }
  return "signin";
});

const toggleMode = () => {
  const mode = pageMode.value === "signin" ?  "signup" : "signin";
  router.replace({
    name: "auth",
    query: {
      mode,
    },
  });
};
</script>

<template>
  <div>
    <SignIn v-show="pageMode === 'signin'" />
    <SignUp v-show="pageMode === 'signup'" />
    <div class="flex gap-4 mt-4 items-center">
      <p class="text-center text-sm text-base-content">
        {{ pageMode === 'signin' ? SIGNIN_TEXT : SIGNUP_TEXT }}
      </p>
      <button
        class="text-blue-700"
        @click="toggleMode"
      >
        {{ pageMode === 'signin' ? SIGN_UP : SIGN_IN }}
      </button>
    </div>
  </div>
</template>
