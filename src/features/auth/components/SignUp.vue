<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useRegister } from "@/features/auth/api/composables/useAuthRequests";
import { useSignUpValidation } from "@/features/auth/composables/useSignUpValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const BTN_SIGNUP = "Sign up";
const SUCCESS_MSG = "Registration successful!";
const ERROR_MSG = "Registration failed. Please try again!";
const SIGN_IN = "Login";
const SIGNUP_TEXT = "Already have an account?";

const emit = defineEmits<{
  (event: "switchMode", mode: "signin");
}>();

const router = useRouter();
const { formData, v$ } = useSignUpValidation();

const errorRegistration = ref<string | null>(null);

const { execute, loading, error } = useRegister({
  onSuccess: () => {
    toast.success(SUCCESS_MSG);
    router.push({ name: "auth", query: { mode: "signin" } });
  },
  onError: () => {
    if(error.value?.status === 409){
      errorRegistration.value = error.value.message;
    }else{
      errorRegistration.value = null;
      toast.error(ERROR_MSG);
    }
  },
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) return;

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
    class="flex flex-col gap-5"
    @submit.prevent="handleSubmit"
  >
    <VInput
      v-model="formData.name"
      placeholder="Username"
      :validation="v$.name"
      icon-left="user"
      icon-color="accent"
      @blur="v$.name.$touch()"
    />
    <VInput
      v-model="formData.email"
      type="email"
      placeholder="Email Address"
      :validation="v$.email"
      icon-left="mail"
      icon-color="accent"
      @blur="v$.email.$touch()"
    />
    <VInput
      v-model="formData.password"
      type="password"
      placeholder="Create Password"
      :validation="v$.password"
      icon-left="lock"
      icon-color="accent"
      @blur="v$.password.$touch()"
    />
    <VInput
      v-model="formData.confirmPassword"
      type="password"
      placeholder="Confirm Password"
      :validation="v$.confirmPassword"
      icon-left="lock"
      icon-color="accent"
      @blur="v$.confirmPassword.$touch()"
    />
    <VButton
      type="submit"
      variant="main"
      :text="BTN_SIGNUP"
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
    />
  </form>
  <div class="flex gap-4 mt-4 items-center">
    <p class="text-center text-sm text-base-content">
      {{ SIGNUP_TEXT }}
    </p>
    <button
      class="text-blue-700"
      @click="emit('switchMode', 'signin')"
    >
      {{ SIGN_IN }}
    </button>
  </div>
</template>
