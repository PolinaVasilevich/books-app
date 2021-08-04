<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <input
      class="form-control input"
      type="text"
      v-model.trim="dataForm.name"
      placeholder="Enter name genre"
      required
    />
    <div class="btns">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </div>
  </form>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin.js";

export default {
  name: "admin-genre-create-form",
  mixin: [adminFormMixin],
  data() {
    return {
      dataForm: { name: "" },
    };
  },

  methods: {
    onReset() {
      this.resetForm(this.dataForm);
    },

    onSubmit() {
      this.addNewRecord("books/genre", this.dataForm, this.genres());
      this.onReset();
    },
  },
};
</script>
