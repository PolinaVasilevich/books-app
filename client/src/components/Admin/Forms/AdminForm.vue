<template>
  <form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <slot name="input"></slot>
    <div class="btns" v-if="showButtons">
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text btn-form"
        type="submit"
      />
      <Button
        label="Reset"
        icon="pi pi-times"
        class="p-button-text btn-form"
        type="reset"
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

    async addNewRecord(path, payload) {
      try {
        await API.post(path, payload);
        this.callback();
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } catch (error) {
        if (error.response.status === 400 && error.response.data.message) {
          this.message = error.response.data.message;
          this.$emit("showErrorMessage", this.message);
        }
        console.log(error);
        this.callback();
      }
    },

    async updateData(path, payload) {
      try {
        await API.put(path, payload);
        this.callback();
        this.message = "Record has updated";
        this.$emit("showMessage", this.message);
      } catch (error) {
        if (error.response.status === 400 && error.response.data.message) {
          this.message = error.response.data.message;
          this.$emit("showErrorMessage", this.message);
        }
        console.log(error);
        this.callback();
      }
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord(this.path, this.dataForm);
        this.onReset();
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
