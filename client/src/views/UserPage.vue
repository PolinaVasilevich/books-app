<template>
  <div class="user-page">
    <h1>Welcome to users page</h1>
    <div>
      <div v-for="item in books" :key="item._id">
        <p class="user-page__book-title">Book: {{ item.book.title }}</p>
        <span class="user-page__book-reserve"
          >Date: {{ new Date(item.data_reserve).toLocaleDateString() }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import API from "../utils/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      books: null,
    };
  },

  computed: {
    ...mapState("login", {
      user: (state) => state.user,
    }),
  },

  created() {
    this.getReservedBooks();
  },

  methods: {
    async getReservedBooks() {
      try {
        const reservedBooks = await API.get("books/info");

        this.books = reservedBooks.data.filter(
          (item) => item.user._id === this.user._id
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
