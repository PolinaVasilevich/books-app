<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <input
      :value="name"
      @input="$emit('update:name', $event.target.value)"
      class="form-control input"
      type="text"
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
  mixins: [adminFormMixin],
  props: {
    typeForm: {
      type: String,
      default: "create",
    },

    dataForm: {
      type: Object,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  methods: {
    onReset() {
      this.resetForm(this.dataForm);
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord("books/genre", this.dataForm, this.getGenres);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updategenre/${this.dataForm._id}`,
          this.dataForm,
          this.getGenres
        );
      }
      this.$emit("closeModal");
    },
  },
};
</script>
