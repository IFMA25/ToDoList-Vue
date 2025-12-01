<script setup>
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

</script>

<template>
  <form
    action="#"
    class="flex flex-col gap-5"
  >
    <VInput
      type="email"
      label="E-mail"
    />
    <VInput
      type="password"
      label="Password"
    />
    <VButton
      type="submit"
      btn-color="gray"
      text="Login"
    />
  </form>
</template>
