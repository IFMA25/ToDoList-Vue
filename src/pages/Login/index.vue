<script setup lang="ts">
import { useValidation } from "@/shared/composables/useValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VInput from "@/shared/ui/common/VInput.vue";
// import VLoader from "@/shared/ui/common/VLoader.vue";


const {
  email,
  password,
  checkedCheckbox,
  emailTouched,
  passwordTouched,
  submitted,
  validationEmail,
  validationPassword,
  loading,
  handleSubmitLogin,
} = useValidation();

const onSubmit = () => {
  handleSubmitLogin(() => {
    alert("✅ Form submitted!");
  }, 2000);
};
</script>

<template>
  <div class="flex flex-col gap-8 p-4 max-w-md mx-auto">
    <VCard title="Login">
      <template #header>
        Please enter your credentials to login.
      </template>
      <template #default>
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
      </template>

      <template #footer>
        <div class="flex items-center justify-end gap-4">
          <div class="flex items-center justify-center mr-20" />
          <VButton
            icon="user-plus"
            to="/register"
            text="Register"
          />
          <VButton
            icon-position="right"
            text="Sign up"
            icon="check"
            :disabled="loading"
            :loader="loading"
            size="sm"
            @click="onSubmit"
          />
        </div>
        <div class="mt-4 flex items-center justify-center ">
          <VCheckbox
            v-model="checkedCheckbox"
            label="Remember me"
          />
        </div>
      </template>
    </VCard>
  </div>
</template>
