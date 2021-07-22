<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped lang="scss">
.btn {
  padding: 10px 15px;
  background: none;
  border: none;
}
</style>
