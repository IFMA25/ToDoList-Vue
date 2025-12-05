<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useLogin } from "../api/composables/useAuthRequests";
import { useSignInValidation } from "../composables/useSignInValidation";

import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

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
      label="E-mail"
      :validation="{
        error: v$.email.$error,
        message: String(v$.email.$errors[0]?.$message ?? '')
      }"
      @blur="v$.email.$touch()"
    />
    <VInput
      v-model="formData.password"
      type="password"
      label="Password"
      :validation="{
        error: v$.password.$error,
        message: String(v$.password.$errors[0]?.$message ?? '')
      }"
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
      btn-color="gray"
      text="Login"
      :loading="loading"
    />
  </form>
</template>
