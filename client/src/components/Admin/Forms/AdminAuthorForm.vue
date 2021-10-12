<template>
  <form
    @submit.prevent="submitForm($emit)"
    @reset.prevent="resetForm"
    class="admin-form"
  >
    <Toast />
    <div class="admin-form__field-container">
      <InputText
        v-model.trim="form.first_name.value"
        :class="{
          'p-invalid': !form.first_name.valid && submitted,
        }"
        @blur="form.first_name.blur"
        placeholder="Enter first name"
      />
      <small v-if="form.first_name.errors.required && submitted" class="p-error"
        >This field is required.</small
      >
    </div>

    <div class="admin-form__field-container">
      <InputText
        v-model.trim="form.last_name.value"
        :class="{
          'p-invalid': !form.last_name.valid && submitted,
        }"
        @blur="form.last_name.blur"
        placeholder="Enter last name"
      />

      <small v-if="form.last_name.errors.required && submitted" class="p-error"
        >This field is required.</small
      >
    </div>
    <div class="btns">
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text btn-form"
        type="submit"
      />
      <!-- <Button
        label="Reset"
        icon="pi pi-times"
        class="p-button-text btn-form"
        type="reset"
      /> -->

      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text btn-form"
        @click="$emit('cancel')"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useForm from "@/hooks/useForm";
import Author from "@/models/Author";
import { required } from "@/validators/validatorsForm";

export default defineComponent({
  name: "admin-authors-form",
  props: {
    initialForm: { required: true, type: Object as PropType<Author> },
  },
  emits: ["submitForm", "cancel"],

  setup(props, { emit }) {
    const { form, submitForm, resetForm, submitted, validForm } = useForm({
      id: { value: props.initialForm._id },
      first_name: {
        value: props.initialForm.first_name,
        validators: { required },
      },

      last_name: {
        value: props.initialForm.last_name,
        validators: { required },
      },
    });

    return { form, submitted, submitForm, resetForm, validForm };
  },
});
</script>
