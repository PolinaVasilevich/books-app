<template>
  <div class="book-card">
    <router-link :to="{ name: 'book', params: { id: book._id } }"
      ><img :src="book.img" :alt="book.title" class="book-card__img" />
    </router-link>
    <p class="book-card__title">
      {{ book.title }}
    </p>
    <p class="book-card__text">
      {{ book.author.first_name + " " + book.author.last_name }}
    </p>
  </div>
</template>

<script>
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
