<template>
  <input
    class="input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "my-input",

  props: {
    modelValue: {
      type: [String, Number],
      default: "",
      required: true,
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #000;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>
