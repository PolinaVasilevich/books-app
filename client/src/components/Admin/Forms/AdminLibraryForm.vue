<template>
  <form
    @submit.prevent="submitForm($emit)"
    @reset.prevent="resetForm"
    class="admin-form"
  >
    <Toast />

    <div class="admin-form__field-container">
      <InputText
        v-model.trim="form.name.value"
        :class="{
          'p-invalid': !form.name.valid && submitted,
        }"
        @blur="form.name.blur"
        placeholder="Enter name"
      />
      <small v-if="form.name.errors.required && submitted" class="p-error"
        >This field is required.</small
      >
    </div>

    <div class="admin-form__field-container">
      <InputText
        v-model.trim="form.address.value"
        :class="{
          'p-invalid': !form.address.valid && submitted,
        }"
        @blur="form.address.blur"
        placeholder="Enter address"
      />
      <small v-if="form.address.errors.required && submitted" class="p-error"
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
import { defineComponent, PropType, reactive, toRefs } from "vue";
import useForm from "@/hooks/useForm";
import Library from "@/models/Library";
import Book from "@/models/Book";
import { required } from "@/validators/validatorsForm";

export default defineComponent({
  name: "admin-library-add-book-form",
  props: {
    initialForm: { required: true, type: Object as PropType<Library> },
  },
  emits: ["submitForm", "cancel"],

  setup(props, { emit }) {
    const { form, submitForm, resetForm, submitted, validForm } = useForm({
      id: { value: props.initialForm._id },
      name: {
        value: props.initialForm.name,
        validators: { required },
      },

      address: {
        value: props.initialForm.address,
        validators: { required },
      },
    });

    return { form, submitted, submitForm, resetForm, validForm };
  },
});
</script>
