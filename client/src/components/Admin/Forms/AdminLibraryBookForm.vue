<template>
  <form
    @submit.prevent="submitForm"
    @reset.prevent="resetForm"
    class="admin-form"
  >
    <Toast />
    <div class="admin-form__field-container">
      <div class="p-float-label" v-if="!initialForm.library">
        <Dropdown
          id="book"
          v-model="book"
          :options="books"
          optionLabel="title"
          style="width: 100%"
          placeholder="Select a book"
          required
        />
        <!-- <label for="book">Books</label> -->
      </div>
    </div>

    <div class="admin-form__field-container">
      <InputNumber
        v-model="count"
        style="width: 100%"
        placeholder="Enter count"
        mode="decimal"
        :useGrouping="false"
        required
      />
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
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import useForm from "@/hooks/useForm";
import BookLibrary from "@/models/BookLibrary";
import Book from "@/models/Book";
import { required } from "@/validators/validatorsForm";

export default defineComponent({
  name: "admin-library-add-book-form",
  props: {
    books: { required: true, type: Object as PropType<Book> },
    initialForm: { required: true, type: Object as PropType<BookLibrary> },
  },
  emits: ["submitForm"],

  setup(props, { emit }) {
    const form = reactive({ ...props.initialForm });

    const submitForm = () => {
      emit("submitForm", form);
    };

    const resetForm = () => {
      // form.value = { ...props.initialForm };
    };

    return { ...toRefs(form), submitForm, resetForm };
  },
});
</script>
