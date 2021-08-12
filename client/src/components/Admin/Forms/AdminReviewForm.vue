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
      <select class="form-control select" v-model="selectUser">
        <option v-for="item in users" :key="item._id" :value="item">
          {{ item.username }}
        </option>
      </select>

      <select class="form-control select" v-model="selectBook">
        <option
          v-for="item in books"
          :key="item._id"
          :value="item"
          :selected="item._id === book._id"
        >
          {{ item.title }}
        </option>
      </select>
      <div class="p-field">
        <label for="text">Text</label>
        <Textarea
          id="text"
          :value="text"
          @input="$emit('update:text', $event.target.value)"
          :autoResize="true"
          rows="5"
          required
        />
        <div>
          <span>Rating: </span><Rating v-model="ratingBook" :readonly="false" />
        </div>
      </div>
    </template>
  </admin-form>
</template>

<script>
import toggle from "@/mixins/toggle.js";
import adminFormData from "@/mixins/adminFormData.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";
import moment from "moment";

export default {
  name: "admin-review-form",
  components: { AdminForm },
  mixins: [toggle, adminFormData],
  data() {
    return { moment };
  },
  props: {
    users: {
      type: Array,
      required: true,
    },

    books: {
      type: Array,
      required: true,
    },

    user: {
      type: Object,
      required: true,
    },

    book: {
      type: Object,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },
  },

  computed: {
    selectUser: {
      get() {
        return this.user;
      },
      set(value) {
        this.$emit("update:user", value);
      },
    },

    selectBook: {
      get() {
        return this.book;
      },
      set(value) {
        this.$emit("update:book", value);
      },
    },

    ratingBook: {
      get() {
        return this.rating;
      },
      set(value) {
        this.$emit("update:rating", value);
      },
    },
  },
};
</script>
