<script setup>

defineOptions({ inheritAttrs: false });
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#2533b0",
  },
  size: {
    type: String,
    default: "w-full h-full",
  },
});

</script>

<template>
  <div
    class="flex gap-3 justify-center"
    :class="props.size"
    v-bind="$attrs"
    :style="{ color: props.color}"
  >
    <p v-if="props.text">
      {{ props.text }}
    </p>
    <slot name="loader">
      <div class="loader" />
    </slot>
  </div>
</template>

<style>
.loader {
  padding: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: currentColor;
  --_m:
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>


