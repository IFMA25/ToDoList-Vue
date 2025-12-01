<script setup>
import { ref, computed, useSlots } from "vue";
import VueFeather from "vue-feather";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  inputColor: {
    type: String,
    default: "grey",
  },
  label: {
    type: String,
    default: "",
  },
  supportText: {
    type: String,
    default: "",
  },
  validation: {
    type: Object,
    default: () => ({ error: false, message: "" }),
  },
  modelValue: {
    type: String,
    default: "",
  },
});
// "blur" без нього в консоли ворнинги, тому що идет ємит блура
const emit = defineEmits(["update:modelValue", "blur"]);

const visible = ref(false);

const handleToggle = () => {
  visible.value = !visible.value;
};

const slots = useSlots();

const inputColorStyles = {
  green: "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500",
  red: "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500",
  blue: "border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
  gray: "border-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-400",
};

const inputClass = computed(() => {
  const hasLeft = !!slots["icon-left"];
  const hasRight = !!slots["icon-right"] || props.type === "password";
  const paddingClass = [
    hasLeft ? "pl-[40px]" : "pl-2",
    hasRight ? "pr-[40px]" : "pr-2",
  ].join(" ");

  const colorClass = props.validation.error ?
    inputColorStyles.red
    : inputColorStyles[props.inputColor];
  return [paddingClass, colorClass].join(" ");
});

</script>

<template>
  <label
    class="block"
    v-bind="$attrs"
  >
    <p class="text-sm font-medium text-gray-800 mb-1">{{ props.label }}</p>
    <div class="relative">
      <slot
        v-if="$slots['icon-left']"
        name="icon-left"
      />
      <input

        :type="props.type === 'password' && !visible ? 'password' : 'text'"
        class="w-full rounded-md border p-2 outline-none text-sm
        text-gray-700 transition-all duration-200"
        :class="inputClass"
        :value="props.modelValue"
        name="input"
        @blur="emit('blur', $event)"
        @input="emit('update:modelValue', $event.target.value)"
      >
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute bottom-[4px] right-[10px] w-[25px] p-0
        bg-transparent border-none text-gray-400 hover:text-blue-600
        transition-colors duration-200"
        @click="handleToggle"
      >
        <VueFeather
          :type="visible ? 'eye' : 'eye-off'"
          class="w-5 h-5"
        />
      </button>
      <slot
        v-if="$slots['icon-right']"
        name="icon-right"
      />
      <p
        class="text-sm absolute top-[100%] left-0"
        :class="props.validation.error ? 'text-red-600 font-medium' : 'text-gray-500'"
      >
        {{ props.validation.error ? props.validation.message : props.supportText }}
      </p>
    </div>
  </label>
</template>
