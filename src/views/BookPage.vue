<template>
  <div class="book">
    <img :src="book.image" :alt="book.title" />
    <p>{{ book.title }}</p>
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
.book {
  display: flex;
}
</style>
