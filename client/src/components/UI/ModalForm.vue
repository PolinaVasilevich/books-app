<template>
  {{ showModal }}
  <Dialog
    :visible="displayModal"
    :style="{ width: '50vw' }"
    :modal="true"
    @update:visible="hideModal"
  >
    <template #header>
      <h3>{{ modalTitle }}</h3>
    </template>
    <slot name="modal-content"></slot>
  </Dialog>
</template>

<script>
export default {
  props: ["modalTitle", "displayModal"],
  methods: {
    hideModal() {
      this.$emit("close");
    },
  },
};
</script>
