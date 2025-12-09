<script setup lang="ts">
import { useRouter } from "vue-router";

const SIGN_IN = "Login";
const SIGN_UP = "Create account";
const SIGNIN_TEXT = "Don't have an account?";
const SIGNUP_TEXT = "Already have an account?";

const props = defineProps<{
  pageMode: "signin" | "signup";
}>();

const router = useRouter();

const toggleMode = () => {
  const mode = props.pageMode === "signin" ?  "signup" : "signin";
  router.replace({
    name: "auth",
    query: {
      mode,
    },
  });
};
</script>

<template>
  <div class="flex gap-4 mt-4 items-center">
    <p class="text-center text-sm text-base-content">
      {{ props.pageMode === 'signin' ? SIGNIN_TEXT : SIGNUP_TEXT }}
    </p>
    <button
      class="text-blue-700"
      @click="toggleMode"
    >
      {{ props.pageMode === 'signin' ? SIGN_UP : SIGN_IN }}
    </button>
  </div>
</template>
