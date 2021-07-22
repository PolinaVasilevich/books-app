<template>
  <input class="input" @input="updateInput" :value="modelValue" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update: modelValue", event.target.value);
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
