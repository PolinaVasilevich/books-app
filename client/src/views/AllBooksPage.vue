<template>
  <div class="books">
    <books-list :books="books || localStorage.getItem('books')" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BooksList from "@/components/Book/BooksList.vue";

export default {
  name: "book-page",
  components: {
    BooksList,
  },

  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
    }),
  },

  computed: {
    ...mapState("books", {
      books: (state) => state.books,
    }),
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<style></style>
