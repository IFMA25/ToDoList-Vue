<script setup lang="ts">
import { useValidation } from "@/shared/composables/useValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";

const {
  email,
  password,
  emailTouched,
  passwordTouched,
  login,
  confirmPassword,
  confirmPasswordTouched,
  submitted,
  loginTouched,
  validationEmail,
  validationPassword,
  validationLogin,
  validationConfirm,
  loading,
  handleSubmitRegister,
} = useValidation();

const onSubmit = () => {
  handleSubmitRegister(() => {
    alert("✅ Form submitted!");
  }, 2000);
};
</script>

<template>
  <div class="flex flex-col gap-8 p-4 max-w-md mx-auto">
    <VCard>
      <template #header>
        <VInput
          v-model="login"
          placeholder="Enter logname"
          label="Login"
          @blur="loginTouched = true"
        >
          <template #label />
          <template
            v-if="(loginTouched || submitted) && validationLogin.error"
            #error
          >
            {{ validationLogin.message }}
          </template>
        </VInput>
        <VInput
          v-model="email"
          placeholder="Enter Email"
          label="Email"
          @blur="emailTouched = true"
        >
          <template #label />
          <template
            v-if="(emailTouched || submitted) && validationEmail.error"
            #error
          >
            {{ validationEmail.message }}
          </template>
        </VInput>
        <VInput
          v-model="password"
          placeholder="Enter password"
          type="password"
          label="Password"
          @blur="passwordTouched = true"
        >
          <template #label />
          <template
            v-if="(passwordTouched || submitted) && validationPassword.error"
            #error
          >
            {{ validationPassword.message }}
          </template>
        </VInput>
        <VInput
          v-model="confirmPassword"
          placeholder="Confirm your password"
          type="password"
          label="Confirm password"
          @blur="confirmPasswordTouched = true"
        >
          <template #label />
          <template
            v-if="(confirmPasswordTouched || submitted) && validationConfirm.error"
            #error
          >
            {{ validationConfirm.message }}
          </template>
        </VInput>
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-4">
          <VButton
            icon="left"
            to="/login"
          >
            <template #icon-left>
              <vue-feather type="log-in" />
            </template>
            Login
          </VButton>
          <VButton
            icon="right"
            :disabled="loading"
            size="sm"
            @click="onSubmit"
          >
            <template #icon-right>
              <span v-if="loading">
                <VLoader />
              </span>
              <span v-else>
                <vue-feather type="check" />
              </span>
            </template>
            Submit
          </VButton>
        </div>
      </template>
    </VCard>
  </div>
</template>
