<template>
  <div class="book-card">
    <router-link :to="{ name: 'book', params: { id: book._id } }"
      ><img :src="book.img" :alt="book.title" class="book-card__img" />
    </router-link>
    <p class="book-card__title">
      <strong>{{ book.title }}</strong>
    </p>
    <p class="book-card__text">
      <em>{{ book.author.first_name + " " + book.author.last_name }}</em>
    </p>
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
