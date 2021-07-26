<template>
  <div class="book-card">
    <router-link :to="{ name: 'book', params: { id: book._id } }"
      ><img :src="book.img" :alt="book.title" class="book-card__img" />
    </router-link>
    <p>{{ book.title }}</p>
    <p>{{ book.author.first_name + " " + book.author.last_name }}</p>
  </div>
</template>

<script>
import "./styles.scss";

export default {
  name: "book-card",
  props: {
    book: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>
