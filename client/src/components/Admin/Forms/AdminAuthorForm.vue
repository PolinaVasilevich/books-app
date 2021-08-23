<template>
  <admin-form
    :typeForm="typeForm"
    :dataForm="dataForm"
    :path="path"
    :callback="callback"
    :isFormValid="isFormValid"
    :textMessage="textMessage"
    @showMessage="showMessage"
    @showErrorMessage="showErrorMessage"
    @resetForm="$emit('resetForm')"
  >
    <template v-slot:input>
      {{ textMessage }}
      <div class="p-field">
        <label for="first_name">First name</label>
        <InputText
          id="first_name"
          :value="first_name"
          @input="$emit('update:first_name', $event.target.value)"
          :class="{ 'p-invalid': v$.form.first_name.$error }"
          required="true"
        />

        <small class="p-error" v-if="v$.form.first_name.$error"
          >This field is required.</small
        >
      </div>

      <div class="p-field">
        <label for="last_name">Last name</label>
        <InputText
          id="last_name"
          :value="last_name"
          @input="$emit('update:last_name', $event.target.value)"
          :class="{ 'p-invalid': v$.form.last_name.$errors.length }"
          required="true"
        />
        <small class="p-error" v-if="v$.form.last_name.$errors.length"
          >This field is required.</small
        >
      </div>
    </template>
  </admin-form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "vuelidate/lib/validators";

import toggle from "@/mixins/toggle.js";
import adminFormData from "@/mixins/adminFormData.js";
import validationMixin from "@/mixins/validationMixin.js";
import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  name: "admin-authors-form",
  components: { AdminForm },
  mixins: [adminFormData, toggle, validationMixin],

  setup() {
    return { v$: useVuelidate() };
  },

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

  validations() {
    return {
      form: {
        first_name: {
          required,
        },
        last_name: {
          required,
        },
      },
    };
  },

  methods: {},
};
</script>
