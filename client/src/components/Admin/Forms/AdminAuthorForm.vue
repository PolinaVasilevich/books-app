<template>
  <admin-form
    :typeForm="typeForm"
    :dataForm="dataForm"
    :path="path"
    :callback="callback"
    @showMessage="showMessage"
    @showErrorMessage="showErrorMessage"
    @resetForm="$emit('resetForm')"
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
import toggle from "@/mixins/toggle.js";
import adminFormData from "@/mixins/adminFormData.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  name: "admin-authors-form",
  components: { AdminForm },
  mixins: [adminFormData, toggle],
  data() {
    return {
      message: "",
    };
  },
  props: {
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
