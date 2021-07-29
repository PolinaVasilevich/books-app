<template>
  <select
    class="form-control"
    id="exampleFormControlSelect1"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.name"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },

    modelValue: {
      type: String,
      default: "",
      required: true,
    },
  },
};
</script>

<style></style>
