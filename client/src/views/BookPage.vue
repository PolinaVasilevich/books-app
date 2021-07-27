<template>
  <div class="container">
    <div class="book">
      <div>
        <img :src="book.img" :alt="book.title" class="book_img" />
        <my-button
          v-if="isLoggedIn"
          class="book__btn"
          @click="onReserveBook(book, user)"
          :disabled="!book.count"
          :class="{ disabled: !book.count }"
          >Book this book</my-button
        >
      </div>
      <div class="book__info info">
        <h2 class="info__title">{{ book.title }}</h2>
        <p class="info__text">
          Author: {{ book.author.first_name + " " + book.author.last_name }}
        </p>
        <p class="info__text">Count books: {{ book.count }}</p>
      </div>
    </div>
    <span>{{ status }}</span>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import API from "../utils/api";

export default {
  data() {
    return {
      book: null,
      status: null,
    };
  },

  created() {
    const book = this.books.find((book) => book._id === this.$route.params.id);
    if (book) {
      this.book = book;
    }
  },

  computed: {
    ...mapState(
      "books",
      {
        books: (state) => state.books,
      },
      "login",
      {
        user: (state) => state.user,
      }
    ),
    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
  },

  methods: {
    async onReserveBook() {
      if (this.book.count) {
        const copyBook = { ...this.book, count: this.book.count - 1 };
        try {
          await API.post(`books/bookinstance`, {
            username: this.$store.state.login.user.username,
            bookId: this.$route.params.id,
          });

          await API.put(`books/book/${this.$route.params.id}`, copyBook);

          // this.status = `Book "${this.book.title}" has reserved`;
          alert(`Book "${this.book.title}" has reserved`);
          this.$router.push("/books");
        } catch (error) {
          console.log(error);
          this.status = error.response.data.message;
        }
      }
    },
  },
};
</script>

<style>
.container {
  margin: 50px auto;
  width: 100%;
}

.book {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.book_img {
  margin-right: 30px;
  display: block;
  object-fit: cover;
  width: 300px;
  height: 400px;
}

.book__btn {
  cursor: pointer;
  margin-top: 30px;
  border: 1px solid #000 !important;
}

.info__text {
  margin-top: 7px;
}

.disabled {
  opacity: 0.25;
  cursor: initial;
}
</style>
