<template>
  <div>
    <Button label="Show" icon="pi pi-external-link" @click="openModal" />
    <Dialog
      header="Add new record"
      v-model:visible="displayModal"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <slot></slot>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: "create-form",
  data() {
    return {
      displayModal: false,
    };
  },
  methods: {
    openModal() {
      this.displayModal = true;
    },
  },
};
</script>

<style scoped lang="scss">
.p-button {
  margin: 0.3rem 0.5rem;
  min-width: 10rem;
}

p {
  margin: 0;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-dialog .p-button {
  min-width: 6rem;
}
</style>
