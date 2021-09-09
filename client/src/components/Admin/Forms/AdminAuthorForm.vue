<template>
  <form @submit.prevent="submit" @reset.prevent="onReset">
    <Toast />
    <div class="p-field">
      <InputText
        v-model="form.first_name.value"
        :class="{ 'p-invalid': !form.first_name.valid }"
        required="true"
        placeholder="Enter first name"
      />
      <small v-if="form.first_name.errors.required" class="p-error"
        >This field is required.</small
      >
    </div>

    <div class="p-field">
      <InputText
        v-model="form.last_name.value"
        :class="{ 'p-invalid': !form.last_name.valid }"
        required="true"
        placeholder="Enter last name"
      />

      <small v-if="form.last_name.errors.required" class="p-error"
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
      <Button
        label="Reset"
        icon="pi pi-times"
        class="p-button-text btn-form"
        type="reset"
      />
    </div>
  </form>
</template>

<script>
import useForm from "@/hooks/useForm";

const required = (val) => !!val;
// const minLength = (num) => (val) => val.length >= num;

export default {
  name: "admin-authors-form",

  setup() {
    const form = useForm({
      first_name: {
        value: "",
        validators: { required },
      },

      last_name: {
        value: "",
        validators: { required },
      },
    });

    return { form };
  },
};
</script>
