<template>
  <admin-form
    :typeForm="typeForm"
    :dataForm="dataForm"
    :path="path"
    :callback="callback"
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

      <select
        class="form-control select"
        v-model="selectAuthor"
        required
        v-selectColor
      >
        <option style="color: #cccccc" disabled value="">
          Select from authors
        </option>
        <option v-for="item in authors" :key="item._id" :value="item">
          {{ item.first_name + " " + item.last_name }}
        </option>
      </select>

      <textarea
        :value="description"
        @input="$emit('update:description', $event.target.value)"
        class="form-control input"
        placeholder="Enter description book"
      />

      <select
        class="form-control select"
        v-model="selectGenre"
        required
        v-selectColor
      >
        <option disabled value="" style="color: #cccccc">
          Select from genres
        </option>
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
      />

      <!-- <input
        :value="count"
        @input="$emit('update:count', $event.target.value)"
        class="form-control input"
        type="number"
        placeholder="Enter count"
        min="0"
        required
      /> -->
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
      type: [String, Object],
      required: true,
    },
    genre: {
      type: [String, Object],
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

    description: {
      type: String,
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
