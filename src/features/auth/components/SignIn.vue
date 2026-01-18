<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useLogin } from "../api/composables/useAuthRequests";
import { useSignInValidation } from "../composables/useSignInValidation";

import { useProfileStore } from "@/features/profile/store/useProfileStore";
import { tokenManager } from "@/shared/api/tokenManager";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const BTN_SIGNIN = "Sign in";
const SIGN_UP = "Create account";
const SIGNIN_TEXT = "Don't have an account?";

const emit = defineEmits<{
  (event: "switchMode", mode: "signup");
}>();

const router = useRouter();
const profileStore = useProfileStore();

const { formData, v$ } = useSignInValidation();

const errorLogin = ref<string | null>(null);

const { execute, loading, error } = useLogin({
  onSuccess: async (response) => {

    tokenManager.setTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });

    await profileStore.fetchProfile();

    if (profileStore.profileData?.role === "admin") {
      router.replace({ name: "users" });
    } else {
      router.replace({ name: "home" });
    }
  },
  onError: () => {
    errorLogin.value = error.value.message;
  },
});

const handleSubmit = async() => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  await execute({
    data: {
      email: formData.email,
      password: formData.password,
    },
  });
};
</script>

<template>
  <h2>{{ $t("signIn.title") }}</h2>
  <form
    action="#"
    class="flex flex-col gap-5"
    @submit.prevent="handleSubmit"
  >
    <VInput
      v-model="formData.email"
      type="email"
      placeholder="Email Address"
      :validation="v$.email"
      icon-left="mail"
      icon-color="text-accent"
      @blur="v$.email.$touch()"
    />
    <VInput
      v-model="formData.password"
      type="password"
      placeholder="Password"
      :validation="v$.password"
      icon-left="lock"
      icon-color="text-accent"
      @blur="v$.password.$touch()"
    />
    <p
      v-if="error"
      class="text-sm text-red-600 font-medium"
    >
      {{ errorLogin }}
    </p>
    <VButton
      type="submit"
      :text="BTN_SIGNIN"
      :loading="loading"
    />
  </form>
  <div class="flex gap-4 mt-4 items-center">
    <p class="text-center text-sm text-base-content">
      {{ SIGNIN_TEXT }}
    </p>
    <button
      class="text-blue-700"
      @click="emit('switchMode', 'signup')"
    >
      {{ SIGN_UP }}
    </button>
  </div>
</template>
