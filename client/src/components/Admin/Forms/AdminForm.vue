<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <slot name="input"></slot>
    <div class="btns">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </div>
  </form>
</template>

<script>
import API from "@/utils/api";
import adminFormMixin from "@/mixins/adminFormMixin.js";

export default {
  name: "admin-form",
  mixins: [adminFormMixin],
  data() {
    return { message: "" };
  },
  props: {
    typeForm: {
      type: String,
    },

    path: {
      type: String,
    },

    payload: {
      type: Object,
    },
    callback: { type: Function },
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
        this.addNewRecord(this.path, this.payload);
      } else if (this.typeForm === "update") {
        this.updateData(this.path, this.payload);
      }
      this.$emit("closeModal");
    },
  },
};
</script>

<style></style>
