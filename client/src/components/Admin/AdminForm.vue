<template>
  <form @submit.prevent="onSubmit" @reset="$emit('resetForm', resetForm(form))">
    <slot></slot>
    <div class="btns">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </div>
  </form>
</template>

<script>
import mixin from "@/mixins/formMixin.js";
export default {
  mixins: [mixin],
  props: {
    path: {
      type: String,
    },

    form: {
      type: Object,
    },

    callback: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      this.$emit("close");
      //   this.addNewRecord(this.path, this.form, this.callback);
      this.updateRecord(this.path, this.form, this.callback);

      this.$emit("resetForm", this.resetForm(this.form));
    },
  },
};
</script>

<style></style>
