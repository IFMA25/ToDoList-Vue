import useVuelidate from "@vuelidate/core";
import { computed, reactive } from "vue";

import { validationRules } from "@/shared/utils/index";

export function useSignInValidation() {
  const formData = reactive({
    email: "",
    password: "",
  });

  const rules = computed(() => ({
    email: {
      required: validationRules.required,
      email: validationRules.email,
    },
    password: {
      required: validationRules.required,
    },
  }));

  const v$ = useVuelidate(rules, formData);

  return { formData, v$ };
}
