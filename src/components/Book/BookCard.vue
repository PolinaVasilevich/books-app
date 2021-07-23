<template>
  <div class="book-card">
    <router-link :to="{ name: 'book', params: { id: book.isbn13 } }"
      ><img :src="book.image" :alt="book.title" />
    </router-link>
    <p>{{ book.title }}</p>
  </div>
</template>

<script>
import "./styles.scss";

export default {
  name: "book-card",
  props: {
    book: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};
</script>
