<template>
  <div class="loader">
    <i class="pi pi-spin pi-spinner spinner"></i>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .spinner {
    font-size: 7rem;
    color: #f66e5e;
    opacity: 0.5;
  }
}
</style>
