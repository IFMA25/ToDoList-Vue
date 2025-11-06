import { ref, computed } from "vue";

export function useValidation() {
  const email = ref("");
  const password = ref("");
  const login = ref("");
  const confirmPassword = ref("");
  const submitted = ref(false);
  const emailTouched = ref(false);
  const passwordTouched = ref(false);
  const confirmPasswordTouched = ref(false);
  const loginTouched = ref(false);
  const loading = ref(false);


  const validationEmail = computed(() => {
    if (email.value === "") {
      return { error: true, message: "Email is required" };
    } else if (!email.value.includes("@")) {
      return { error: true, message: "Invalid email" };
    }
    return { error: false, message: "" };
  });

  const validationLogin = computed(() => {
    if (login.value == "") {
      return { error: true, message: "Login is required" };
    } else {
      return { error: false, message: "Invalid login" };
    }
  });

  const validationPassword = computed(() => {
    if (password.value === "") {
      return { error: true, message: "Password is required" };
    } else if (password.value.length < 6) {
      return { error: true, message: "Password must be at least 6 characters long" };
    }
    return { error: false, message: "" };
  });
  const validationConfirm = computed(() => {
    if (password.value == "") {
      return { error: true, message: "Please confirm your password" };
    } else if (confirmPassword.value !== password.value) {
      return { error: true, message: "Passwords do not match" };
    } else {
      return { error: false, message: "" };
    }
  });

  const handleSubmitRegister = (callback?: () => void, delay = 2000) => {
    submitted.value = true;
    emailTouched.value = true;
    passwordTouched.value = true;
    loginTouched.value = true;
    confirmPasswordTouched.value = true;

    if (!validationEmail.value.error
        && !validationPassword.value.error
        && !validationLogin.value.error
        && !validationConfirm.value.error) {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
        callback?.();
      }, delay);
    }
  };
  const handleSubmitLogin = (callback?: () => void, delay = 2000) => {
    submitted.value = true;
    emailTouched.value = true;
    passwordTouched.value = true;


    if (!validationEmail.value.error
        && !validationPassword.value.error
    ) {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
        callback?.();
      }, delay);
    }
  };


  return {
    email,
    password,
    emailTouched,
    passwordTouched,
    login,
    loading,
    confirmPassword,
    confirmPasswordTouched,
    submitted,
    loginTouched,
    validationEmail,
    validationPassword,
    validationLogin,
    validationConfirm,
    handleSubmitRegister,
    handleSubmitLogin,
  };
}
