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
import toggle from "@/mixins/toggle.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  name: "admin-genre-form",
  components: { AdminForm },
  mixins: [adminFormMixin, toggle],
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
};
</script>
