<template>
  <div class="book-page">
    <Message v-if="displayMessage" severity="success">{{ message }}</Message>

    <Message v-if="displayErrorMessage" severity="error">{{ message }}</Message>
    <div class="book-page__content" style="float: left">
      <div>
        <img
          :src="book.img"
          :alt="book.title"
          class="book-page__content__img"
        />
      </div>
      <div class="book-page__content__info">
        <h2 class="book-page__content__info__title">{{ book.title }}</h2>
        <p class="book-page__content__info__text">
          <strong>Author: </strong>
          {{ book.author.first_name + " " + book.author.last_name }}
        </p>
        <p class="book-page__content__info__text">
          <strong>Genre: </strong>
          {{ book.genre.name }}
        </p>

        <p class="book-page__content__info__text">
          <strong>Count books: </strong>
          {{ book.count }}
        </p>
      </div>
    </div>
    <div class="book-page__form" style="width: 30%; float: right">
      <admin-form
        :style="{ width: '100%' }"
        @resetForm="fillinForm(book)"
        @showMessage="showMessage"
        @showErrorMessage="showErrorMessage"
        typeForm="update"
        :payload="editForm"
        :path="`/books/updatebook/${editForm._id}`"
        :callback="this.getBooks"
      >
        <template v-slot:input>
          <input
            v-model="editForm.title"
            class="form-control input"
            type="text"
            placeholder="Enter title"
            required
          />

          <select class="form-control select" v-model="editForm.author">
            <option v-for="item in authors" :key="item._id" :value="item">
              {{ item.first_name + " " + item.last_name }}
            </option>
          </select>

          <select class="form-control select" v-model="editForm.genre">
            <option v-for="item in genres" :key="item._id" :value="item">
              {{ item.name }}
            </option>
          </select>

          <input
            v-model="editForm.img"
            class="form-control input"
            type="text"
            placeholder="Enter image"
            required
          />

          <input
            v-model="editForm.count"
            class="form-control input"
            type="number"
            placeholder="Enter count"
            min="1"
            required
          />
        </template>
      </admin-form>
    </div>
  </div>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin";
import toggle from "@/mixins/toggle.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";

export default {
  mixins: [adminFormMixin, toggle],
  components: { AdminForm },

  data() {
    return {
      book: null,
      editForm: {
        _id: "",
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },
    };
  },

  methods: {
    getBook() {
      try {
        const book = this.books.find(
          (book) => book._id === this.$route.params.id
        );

        if (book) {
          this.book = book;
          this.editForm = book;
        }
      } catch (error) {
        console.log(error);
      }
    },

    fillinForm(book) {
      this.editForm = book;
    },
  },

  created() {
    this.getBooks();
    this.getAuthors();
    this.getGenres();
    this.getBook();
  },
};
</script>
