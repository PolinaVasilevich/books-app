<template>
  <Dialog
    :visible="displayConfirmDialog"
    @update:visible="hideConfirmDialog"
    :style="{ width: '50vw' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
      <span v-if="text">Are you sure you want to {{ text }} ?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideConfirmDialog"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="$emit('action')"
      />
    </template>
  </Dialog>
</template>

<script>
export default {
  name: "confirm-dialog",
  props: {
    text: {
      type: String,
      default: "do it",
    },
    displayConfirmDialog: {
      type: Boolean,
    },
  },
  methods: {
    hideConfirmDialog() {
      this.$emit("hideConfirmDialog");
    },
  },
};
</script>

<style></style>
