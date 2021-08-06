<template>
  <div>
    <div class="btns">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </div>
  </div>
</template>

<script>
import API from "@/utils/api";
import adminFormMixin from "@/mixins/adminFormMixin.js";

export default {
  name: "admin-buttons-form",
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
      this.resetForm(this.dataForm);
    },

    async addNewRecord(path, payload) {
      try {
        await API.post(path, payload);
        this.callback();
      } catch (error) {
        console.log(error);
        this.callback();
      }
    },

    async updateData(path, payload) {
      try {
        await API.put(path, payload);
        this.callback();
      } catch (error) {
        console.log(error);
        this.callback();
      }
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord(this.path, this.payload);
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } else if (this.typeForm === "update") {
        this.updateData(this.path, this.payload);
        this.message = "Record has updated";
        this.$emit("showMessage", this.message);
      }
      this.$emit("closeModal");
    },
  },
};
</script>

<style></style>
