<template>
  <div class="container">
    <div class="book">
      <div>
        <img :src="book.image" :alt="book.title" />
        <my-button class="book__btn">Book book</my-button>
      </div>
      <div class="book__info">
        <p>{{ book.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      book: null,
    };
  },
  created() {
    const book = this.books.find(
      (book) => book.isbn13 === this.$route.params.id
    );
    if (book) {
      this.book = book;
    }
  },
  computed: {
    ...mapState("books", {
      books: (state) => state.books,
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
img {
  object-fit: contain;
}
.book__btn {
  border: 1px solid #000 !important;
}
</style>
