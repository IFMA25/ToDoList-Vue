<script setup lang="ts">
import { useValidation } from "@/shared/composables/useValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VDropdown from "@/shared/ui/common/VDropdown.vue";
import VInput from "@/shared/ui/common/VInput.vue";
// import VLoader from "@/shared/ui/common/VLoader.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";

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
  checkedSwitcher,
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
    <VCard
      title="Register"
    >
      <template #default>
        <VInput
          v-model="login"
          placeholder="Enter logname"
          label="Login"
          @blur="loginTouched = true"
        >
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
          <template
            v-if="(emailTouched || submitted) && validationEmail.error"
            #error
          >
            {{ validationEmail.message }}
          </template>
        </VInput>
        <VDropdown
          :options="[
            { label: 'Male', value: 1 },
            { label: 'Female', value: 2 },
            { label: 'Unknown', value: 3 },
          ]"
          placeholder="Choose your gender"
          label="Gender"
        />
        <VInput
          v-model="password"
          placeholder="Enter password"
          type="password"
          label="Password"
          @blur="passwordTouched = true"
        >
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
            icon="log-in"
            to="/login"
            text="Login"
          />
          <VButton
            text="Sign up"
            icon="check"
            icon-position="right"
            :disabled="loading"
            size="sm"
            @click="onSubmit"
          />
        </div>
        <div class=" flex items-center justify-left gap-4">
          <VSwitch
            v-model="checkedSwitcher"
            label="Checked"
          />
        </div>
      </template>
    </VCard>
  </div>
</template>
