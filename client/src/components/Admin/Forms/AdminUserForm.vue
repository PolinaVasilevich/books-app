<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <input
      :value="username"
      @input="$emit('update:username', $event.target.value)"
      class="form-control input"
      type="text"
      placeholder="Enter username"
      required
    />
    <input
      :value="password"
      @input="$emit('update:last_name', $event.target.value)"
      class="form-control input"
      type="text"
      placeholder="Enter password"
      required
    />
    <div class="form-check form-check-inline" :style="{ marginTop: '10px' }">
      <label class="form-check-label" for="inlineCheckbox1">Admin</label>
      <input
        :checked="isAdmin"
        @input="$emit('update:isAdmin', $event.target.checked)"
        class="form-check-input"
        type="checkbox"
      />
    </div>
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

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  methods: {
    onReset() {
      this.resetForm(this.dataForm);
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord("auth/user", this.dataForm, this.getUsers);
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/auth/updateuser/${this.dataForm._id}`,
          this.dataForm,
          this.getUsers
        );
        this.message = "Record has updated";
        this.$emit("showMessage", this.message);
      }
      this.$emit("closeModal");
    },
  },
};
</script>
