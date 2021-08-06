<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <input
      :value="first_name"
      @input="$emit('update:first_name', $event.target.value)"
      class="form-control input"
      type="text"
      placeholder="Enter first name"
      required
    />
    <input
      :value="last_name"
      @input="$emit('update:last_name', $event.target.value)"
      class="form-control input"
      type="text"
      placeholder="Enter last name"
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
  data() {
    return {
      message: "",
    };
  },
  props: {
    typeForm: {
      type: String,
      default: "create",
    },

    dataForm: {
      type: Object,
      required: true,
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
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
        this.addNewRecord("books/author", this.dataForm, this.getAuthors);
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updateauthor/${this.dataForm._id}`,
          this.dataForm,
          this.getAuthors
        );
        this.message = "Record has updated";
        this.$emit("showMessage", this.message);
      }
      this.$emit("closeModal");
    },
  },
};
</script>
