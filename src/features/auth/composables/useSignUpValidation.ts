import useVuelidate from "@vuelidate/core";
import { computed, reactive } from "vue";

import { validationRules, confirmPassword } from "@/shared/utils/index";

export function useSignUpValidation() {
  const formData = reactive({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const rules = computed(() => ({
    email: {
      required: validationRules.required,
      email: validationRules.email,
    },
    name: {
      requiredTrimmed: validationRules.requiredTrimmed,
    },
    password: {
      required: validationRules.required,
      minLength: validationRules.minLength(8),
      hasUpperCase: validationRules.hasUpperCase,
      hasNumber: validationRules.hasNumber,
    },
    confirmPassword: {
      required: validationRules.required,
      confirmPassword: confirmPassword(formData.password),
    },
    agreeToTerms: {
      requiredCheckbox: validationRules.requiredCheckbox,
    },
  }));

  const v$ = useVuelidate(rules, formData);

  return { formData, v$ };
}
