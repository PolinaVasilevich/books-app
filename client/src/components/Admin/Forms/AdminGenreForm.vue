<template>
  <admin-form
    :typeForm="typeForm"
    :payload="dataForm"
    :path="path"
    :callback="callback"
    @showMessage="showMessage"
  >
    <template v-slot:input>
      <input
        :value="name"
        @input="$emit('update:name', $event.target.value)"
        class="form-control input"
        type="text"
        placeholder="Enter name genre"
        required
      />
    </template>
  </admin-form>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  name: "admin-genre-form",
  components: { AdminForm },
  mixins: [adminFormMixin],
  data() {
    return { message: "" };
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
    path: {
      type: String,
      required: true,
    },

    callback: {
      type: Function,
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
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updategenre/${this.dataForm._id}`,
          this.dataForm,
          this.getGenres
        );
        this.message = "Record has updated";
        this.$emit("showMessage", this.message);
      }
      this.$emit("closeModal");
    },
  },
};
</script>
