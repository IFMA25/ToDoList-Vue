<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useRegister } from "@/features/auth/api/composables/useAuthRequests";
import { useSignUpValidation } from "@/features/auth/composables/useSignUpValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const { formData, v$ } = useSignUpValidation();
const router = useRouter();

const errorRegistration = ref<string | null>(null);

const { execute, loading, error } = useRegister({
  onSuccess: () => {
    toast.success("Registration successful!");
    router.replace({ name: "signin", query: { mode: "signin" } });
  },
  onError: () => {
    if(error.value?.status === 409){
      errorRegistration.value = error.value.message;
    }else{
      errorRegistration.value = null;
      toast.error("Registration failed. Please try again.");
    }
    return;
  },
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  await execute({
    data: {
      email: formData.email,
      password: formData.password,
      name: formData.name,
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
        error: v$.email.$error || errorRegistration,
        message: String(errorRegistration ? errorRegistration : v$.email.$errors[0]?.$message)
      }"
      @blur="v$.email.$touch()"
    />
    <VInput
      v-model="formData.name"
      type="text"
      label="Name"
      :validation="{
        error: v$.name.$error,
        message: String(v$.name.$errors[0]?.$message ?? '')
      }"
      @blur="v$.name.$touch()"
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
    <VInput
      v-model="formData.confirmPassword"
      type="password"
      label="Confirm password"
      :validation="{
        error: v$.confirmPassword.$error,
        message: String(v$.confirmPassword.$errors[0]?.$message ?? '')
      }"
      @blur="v$.confirmPassword.$touch()"
    />
    <VButton
      type="submit"
      btn-color="gray"
      text="Create account"
      :loading="loading"
    />
    <VCheckbox
      v-model="formData.agreeToTerms"
      width="w-5"
      height="h-5"
      variant="gray"
      label="I agree to the storage of my personal data."
      class="text-blue-600"
      :validation="{
        error: v$.agreeToTerms.$error,
        message: String(v$.agreeToTerms.$errors[0]?.$message ?? '')
      }"
      :loading="loading"
      @blur="v$.agreeToTerms.$touch()"
    />
  </form>
</template>
