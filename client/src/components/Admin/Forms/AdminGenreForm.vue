<template>
  <admin-form
    :typeForm="typeForm"
    :dataForm="dataForm"
    :path="path"
    :callback="callback"
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
import adminFormData from "@/mixins/adminFormData.js";
import toggle from "@/mixins/toggle.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  name: "admin-genre-form",
  components: { AdminForm },
  mixins: [adminFormData, toggle],
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
