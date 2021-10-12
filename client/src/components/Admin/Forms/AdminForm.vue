<template>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <Toast />
    <slot name="input"></slot>
    <div class="btns" v-if="showButtons">
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text btn-form"
        type="submit"
      />
      <!-- <Button
        label="Reset"
        icon="pi pi-times"
        class="p-button-text btn-form"
        type="reset"
      /> -->
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text btn-form"
        @click="onCancel"
      />
    </div>
  </form>
</template>

<script>
import API from "@/utils/api";
import adminFormMixin from "@/mixins/adminFormMixin.js";
import adminFormData from "@/mixins/adminFormData.js";

export default {
  name: "admin-form",
  mixins: [adminFormMixin, adminFormData],

  props: {
    showButtons: {
      type: Boolean,
      default: true,
    },

    isFormValid: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onReset() {
      this.$emit("resetForm");
    },

    onCancel() {
      this.$emit("resetForm");
      this.$emit("closeModal");
      this.$emit("closeEditForm");
    },

    async addNewRecord(path, payload, textMessage = "Item created") {
      try {
        await API.post(path, payload);
        this.callback();
        this.showMessage(textMessage);
      } catch (error) {
        console.log(error);
        this.callback();
        this.showErrorMessage(error.response.data.message);
      }
    },

    async updateData(path, payload, textMessage = "Item updated") {
      try {
        await API.put(path, payload);
        this.callback();

        this.showMessage(textMessage);
      } catch (error) {
        console.log(error);
        this.callback();
        this.showErrorMessage(error.response.data.message);
      }
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord(this.path, this.dataForm);
        this.onReset();
        this.$emit("closeModal");
      } else if (this.typeForm === "update") {
        this.updateData(this.path, this.dataForm);
        this.onReset();
      }
      this.$emit("closeModal");
      this.$emit("closeEditForm");
    },
  },
};
</script>

<style></style>
