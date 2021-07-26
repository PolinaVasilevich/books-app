<template>
  <div class="container">
    <div class="book">
      <div>
        <img :src="book.img" :alt="book.title" class="book_img" />
        <my-button v-if="isLoggedIn" class="book__btn"
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      book: null,
    };
  },
  created() {
    const book = this.books.find((book) => book._id === this.$route.params.id);
    if (book) {
      this.book = book;
    }
  },
  computed: {
    ...mapState("books", {
      books: (state) => state.books,
    }),
    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
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
  margin-top: 30px;
  border: 1px solid #000 !important;
}

.info__text {
  margin-top: 7px;
}
</style>
