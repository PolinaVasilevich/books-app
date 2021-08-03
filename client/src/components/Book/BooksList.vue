<template>
  <div class="book-list">
    <book-card v-for="book in books" :key="book.isbn13" :book="book" />
  </div>
</template>

<script>
import BookCard from "./BookCard.vue";

export default {
  components: {
    BookCard,
  },
  props: {
    books: {
      type: Array,
      requied: true,
    },
  },
};
</script>
