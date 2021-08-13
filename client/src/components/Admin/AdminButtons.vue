<template>
  <div>
    <Button
      icon="pi pi-pencil"
      class="p-button-rounded p-button-success p-mr-2"
      @click="$emit('showEditForm')"
    />
    <Button
      icon="pi pi-trash"
      class="p-button-rounded p-button-warning"
      @click="$emit('delete')"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.p-button {
  margin-right: 0.5rem;
}

.sizes {
  .button {
    margin-bottom: 0.5rem;
    display: block;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@media screen and (max-width: 640px) {
  .p-button {
    margin-bottom: 0.5rem;

    &:not(.p-button-icon-only) {
      display: flex;
      width: 100%;
    }
  }

  .p-buttonset {
    .p-button {
      margin-bottom: 0;
    }
  }
}
</style>
