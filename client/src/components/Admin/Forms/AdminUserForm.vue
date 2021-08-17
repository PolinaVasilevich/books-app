<template>
  <admin-form
    :typeForm="typeForm"
    :dataForm="dataForm"
    :path="path"
    :callback="callback"
    @showMessage="showMessage"
    @showErrorMessage="showErrorMessage"
  >
    <template v-slot:input>
      <input
        :value="username"
        @input="$emit('update:username', $event.target.value)"
        class="form-control input"
        type="text"
        placeholder="Enter username"
        required
        :disabled="typeForm === 'update'"
      />
      <input
        v-if="typeForm === 'create'"
        :value="password"
        @input="$emit('update:password', $event.target.value)"
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
    </template>
  </admin-form>
</template>

<script>
import adminFormData from "@/mixins/adminFormData.js";
import toggle from "@/mixins/toggle.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  name: "admin-user-form",
  components: { AdminForm },
  mixins: [adminFormData, toggle],

  props: {
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
};
</script>
