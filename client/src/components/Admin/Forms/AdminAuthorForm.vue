<template>
  <admin-form
    :typeForm="typeForm"
    :payload="dataForm"
    :path="path"
    :callback="callback"
    @showMessage="showMessage"
    @showErrorMessage="showErrorMessage"
  >
    <template v-slot:input>
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
    </template>
  </admin-form>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  name: "admin-authors-form",
  components: { AdminForm },
  mixins: [adminFormMixin, toggle],
  data() {
    return {
      message: "",
    };
  },
  props: {
    typeForm: {
      type: String,
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

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },
  },
};
</script>
