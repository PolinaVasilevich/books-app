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
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        class="form-control input"
        type="text"
        placeholder="Enter title"
        required
      />

      <select class="form-control select" v-model="selectAuthor">
        <option v-for="item in authors" :key="item._id" :value="item">
          {{ item.first_name + " " + item.last_name }}
        </option>
      </select>

      <select class="form-control select" v-model="selectGenre">
        <option
          v-for="item in genres"
          :key="item._id"
          :value="item"
          :selected="item._id === genre._id"
        >
          {{ item.name }}
        </option>
      </select>

      <input
        :value="img"
        @input="$emit('update:img', $event.target.value)"
        class="form-control input"
        type="text"
        placeholder="Enter image"
        required
      />

      <input
        :value="count"
        @input="$emit('update:count', $event.target.value)"
        class="form-control input"
        type="number"
        placeholder="Enter count"
        min="1"
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
  name: "admin-books-form",
  components: { AdminForm },
  mixins: [adminFormData, toggle],
  props: {
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
    img: {
      type: String,
      required: true,
    },
    count: {
      type: [String, Number],
      required: true,
    },
    authors: {
      type: Object,
    },
    genres: {
      type: Object,
    },
  },
  computed: {
    selectAuthor: {
      get() {
        return this.author;
      },
      set(value) {
        this.$emit("update:author", value);
      },
    },
    selectGenre: {
      get() {
        return this.genre;
      },
      set(value) {
        this.$emit("update:genre", value);
      },
    },
  },
};
</script>
