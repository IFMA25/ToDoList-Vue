<script setup lang="ts">
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import { useAuthMode } from "./composables/useAuthMode";

import ActionAuth from "@/features/auth/components/SwitchModeAuth.vue";
import TitleAuth from "@/features/auth/components/TitleAuth.vue";

const { pageMode, switchMode } = useAuthMode();

const page = {
  signin: SignIn,
  signup: SignUp,
};
</script>

<template>
  <section class="w-[28rem] bg-bgGradient px-8 py-10 border border-borderAuth rounded-2xl">
    <ActionAuth
      :page-mode="pageMode || 'signin'"
      @switch-mode="switchMode"
    />
    <TitleAuth :text="$t('auth.titleSignIn')" />
    <component
      :is="page[pageMode]"
      :page-mode="pageMode"
      @switch-mode="switchMode"
    />
  </section>
</template>
