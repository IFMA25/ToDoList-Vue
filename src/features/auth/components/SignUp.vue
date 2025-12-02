<script setup lang="ts">
import { useSignupValidation } from "@/features/auth/composables/useSignUpValidation";
import { tokenManager } from "@/shared/api";
import { RegisterRequest, RegisterResponse } from "@/shared/api/types";
import { useApiPost } from "@/shared/composables/useApi";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import { toast } from "vue-sonner";

const { formData, v$ } = useSignupValidation();

const { loading, error, execute } = useApiPost<RegisterResponse, RegisterRequest>("api/auth/register");

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  try {
    const result = await execute({
      data: {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
    });

    if (result && !error.value) {
      tokenManager.setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      console.log(error);
      toast("Registration successful!");
    }
  } catch (err) {
    console.error("Ошибка регистрации:", err);
  }
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
    <div class="flex gap-2">
      <VInput
        v-model="formData.name"
        type="text"
        label="Name"
        class="w-[40%]"
        :validation="{
          error: v$.name.$error,
          message: String(v$.name.$errors[0]?.$message ?? '')
        }"
        @blur="v$.name.$touch()"
      />
    </div>

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
      :disabled="loading"
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
      @blur="v$.agreeToTerms.$touch()"
    />
  </form>
</template>
