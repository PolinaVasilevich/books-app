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

    async checkReserveBook(bookID, userID) {
      try {
        const books = JSON.parse(JSON.stringify(this.reservedBooks)).filter(
          (book) => book.book._id === bookID && book.user._id === userID
        );
        this.isReserved = !!books.length;
      } catch (error) {
        console.log(error);
      }
    },

    async onReserveBook() {
      if (this.book.count) {
        try {
          await API.post(`books/reservebook`, {
            user: this.user,
            book: this.book,
          });

          this.message = `Book "${this.book.title}" has reserved`;
          this.showMessage = true;
          this.isReserved = true;
          this.getBooks();
          this.getBook();
        } catch (error) {
          console.log(error);
          this.message = error.response.data.message;
          this.showMessage = true;
          this.getBooks();
          this.getBook();
        }
      }
    },
    ...mapActions({
      getBooks: "books/getBooks",
      getReservedBooks: "books/getReservedBooks",
    }),
  },

  computed: {
    ...mapState({
      books: (state) => state.books.books,
      reservedBooks: (state) => state.books.reservedBooks,
      user: (state) => state.login.user,
    }),

    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
  },

  created() {
    this.getBooks();
    this.getBook(this.books);
    this.getReservedBooks();
    this.checkReserveBook(this.book._id, this.user._id);
  },
};
</script>
