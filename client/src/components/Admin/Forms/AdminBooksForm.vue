<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <input
      :value="title"
      @input="$emit('update:title', $event.target.value)"
      class="form-control input"
      type="text"
      placeholder="Enter title"
      required
    />
    <Dropdown
      :value="author"
      @input="$emit('update:author', $event.target.value)"
      v-model="selectedItem"
      placeholder="Select a author"
      :options="authors"
      optionLabel="first_name"
      :editable="true"
    />

    <Dropdown
      :value="genre"
      @input="$emit('update:genre', $event.target.value)"
      placeholder="Select a genre"
      :options="genres"
      optionLabel="name"
      :editable="true"
    />

    <input
      :value="author"
      @input="$emit('update:author', $event.target.value)"
      class="form-control input"
      type="text"
      placeholder="Enter author"
      required
    />

    <input
      :value="genre"
      @input="$emit('update:genre', $event.target.value)"
      class="form-control input"
      type="text"
      placeholder="Enter genre"
      required
    />

    <input
      :value="count"
      @input="$emit('update:count', $event.target.value)"
      class="form-control input"
      type="number"
      placeholder="Enter count"
      required
    />

    <div class="btns">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </div>
  </form>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin.js";

export default {
  name: "admin-genre-create-form",
  mixins: [adminFormMixin],
  props: {
    typeForm: {
      type: String,
      default: "create",
    },

    dataForm: {
      type: Object,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    count: {
      type: [String, Number],
      required: true,
    },
  },

  methods: {
    onReset() {
      this.resetForm(this.dataForm);
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord("books/book", this.dataForm, this.getBooks);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updatebook/${this.dataForm._id}`,
          this.dataForm,
          this.getBooks
        );
      }
      this.$emit("closeModal");
    },
  },
};
</script>
