import { required, email, minLength, sameAs, helpers } from "@vuelidate/validators";

export const validationRules = {
  required: helpers.withMessage("This field is required", required),
  email: helpers.withMessage("Invalid email address", email),
  minLength: (min: number) =>
    helpers.withMessage(`Minimum ${min} characters required`, minLength(min)),
  hasUpperCase: helpers.withMessage(
    "Must contain min 1 uppercase letter",
    (value: string) => /[A-Z]/.test(value),
  ),
  hasNumber: helpers.withMessage(
    "Must contain min 1 number",
    (value: string) => /\d/.test(value),
  ),
  requiredTrimmed: helpers.withMessage(
    "The field must not be empty.",
    (value: string) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      return !!value;
    },
  ),
  requiredCheckbox: helpers.withMessage(
    "You must agree to continue",
    (value: boolean) => value === true,
  ),
};

export const confirmPassword = (password: string) =>
  helpers.withMessage("Passwords do not match", sameAs(password));


export function capitalizeFirstLetter(value: string): string {
  return value
    .split(" ")
    .map((word) => word ? word[0].toUpperCase() + word.slice(1) : word)
    .join(" ");
}
