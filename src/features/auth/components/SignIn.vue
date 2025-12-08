<script setup lang="ts">
import { ref } from "vue";
import VueFeather from "vue-feather";
import { useRouter } from "vue-router";

import { useLogin } from "../api/composables/useAuthRequests";
import { useSignInValidation } from "../composables/useSignInValidation";

import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const BTN_SIGNIN = "Sign in";

const router = useRouter();
const { formData, v$ } = useSignInValidation();

const errorLogin = ref<string | null>(null);

const { execute, loading, error } = useLogin({
  onSuccess: () => {
    router.replace({ name: "home" });
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
      @blur="v$.email.$touch()"
    >
      <template #icon-left>
        <VueFeather
          type="mail"
          class="w-5 h-5 text-accent"
        />
      </template>
    </VInput>
    <VInput
      v-model="formData.password"
      type="password"
      placeholder="Password"
      :validation="v$.password"
      @blur="v$.password.$touch()"
    >
      <template #icon-left>
        <VueFeather
          type="lock"
          class="w-5 h-5 text-accent"
        />
      </template>
    </VInput>
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
</template>
