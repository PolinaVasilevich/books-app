<template>
  <input
    class="form-control input"
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
  margin-top: 15px;
}
</style>
