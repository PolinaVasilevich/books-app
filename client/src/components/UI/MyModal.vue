<template>
  <div class="modal" v-if="showModal" @click.stop="$emit('close')">
    <div @click.stop class="modal__content">
      <button
        type="button"
        class="btn btn-warning btn-sm modal__cross"
        @click="$emit('close')"
      >
        x
      </button>
      <div @click.stop class="modal__content">
        <h2>Add new record</h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-modal",
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.modal__content {
  margin: auto;
  position: relative;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 500px;
  padding: 40px;
}
.modal__cross {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
