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
  data() {
    return {
      message: "",
    };
  },
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

    img: {
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
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updatebook/${this.dataForm._id}`,
          this.dataForm,
          this.getBooks
        );
        this.message = "Record has updated";
        this.$emit("showMessage", this.message);
      }
      this.$emit("closeModal");
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

  created() {
    this.getAuthors();
    this.getGenres();
  },
};
</script>
