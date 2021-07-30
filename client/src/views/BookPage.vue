<template>
  <my-alert class="alert" :message="message" v-if="showMessage" />
  <my-alert
    class="alert alert-warning"
    message="Sorry, but now books out of stock."
    v-if="!book.count"
  />

  <my-alert
    class="alert alert-warning"
    message="You have already reserved this book"
    v-if="isReserved"
  />

  <div class="book-page">
    <div class="book-page__content">
      <div>
        <img
          :src="book.img"
          :alt="book.title"
          class="book-page__content__img"
        />
        <button
          v-if="isLoggedIn"
          class="book-page__content__btn btn btn-outline-primary"
          @click="onReserveBook(book, user)"
          :disabled="!book.count"
          :class="{ disabled: !book.count || isReserved }"
        >
          <i v-if="!isReserved" class="bi bi-book book-page__content__icon">
            Reserve book</i
          >
          <i v-else class="bi bi-book-fill book-page__content__icon">
            Reserved</i
          >
        </button>
      </div>
      <div class="book-page__content__info">
        <h2 class="book-page__content__info__title">{{ book.title }}</h2>
        <p class="book-page__content__info__text">
          <strong>Author: </strong>
          {{ book.author.first_name + " " + book.author.last_name }}
        </p>
        <p class="book-page__content__info__text">
          <strong>Count books: </strong>
          {{ book.count }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MyAlert from "@/components/UI/MyAlert";
import API from "../utils/api";

import "@/assets/styles/bookPage.scss";

export default {
  components: {
    MyAlert,
  },
  data() {
    return {
      book: {},
      message: "",
      showMessage: false,
      isReserved: false,
    };
  },

  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
    }),

    getBook(books) {
      try {
        const book = books.find((book) => book._id === this.$route.params.id);

        if (book) {
          this.book = book;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async checkReserveBook(bookId, username) {
      try {
        const reservedBooks = await API.get("books/info");

        const books = reservedBooks.data.filter(
          (item) => item.user.username === username && item.book._id === bookId
        );

        this.isReserved = !!books.length;
      } catch (error) {
        console.log(error);
      }
    },

    async onReserveBook() {
      if (this.book.count) {
        try {
          const payload = {
            ...this.book,
            count: this.book.count - 1,
            genre: this.book.genre[0].name,
            author:
              this.book.author.first_name + " " + this.book.author.last_name,
          };

          await API.put(`books/updatebook/${this.book._id}`, payload);

          await API.post(`books/reservebook`, {
            username: this.username,
            bookId: this.book._id,
          });

          this.book = { ...this.book, count: this.book.count - 1 };

          this.message = `Book "${this.book.title}" has reserved`;
          this.showMessage = true;
        } catch (error) {
          console.log(error);
          this.message = error.response.data.message;
          this.showMessage = true;
        }
      }
    },
  },

  computed: {
    ...mapState({
      books: (state) => state.books.books,
      username: (state) => state.login.user.username,
    }),

    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
  },

  created() {
    this.getBook(this.books);

    this.checkReserveBook(this.book._id, this.username);
  },
};
</script>
