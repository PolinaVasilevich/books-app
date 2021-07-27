<template>
  <div class="user-page">
    <h1>Welcome to users page</h1>
    <div>
      <div v-for="item in reservedBooks" :key="item._id">
        <p class="user-page__book-title">{{ item.title }}</p>
        <span class="user-page__book-reserve"></span>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../utils/api";

export default {
  data() {
    return {
      reservedBooks: null,
    };
  },

  created() {
    this.getReservedBooks();
  },

  methods: {
    async getReservedBooks() {
      try {
        const reservedBooks = await API.get("books/info");
        this.reservedBooks = reservedBooks;
        console.log(this.reservedBooks);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
