<template>
  <div class="user-page">
    <h1>My Books</h1>
    <div>
      <div v-for="item in books" :key="item._id" class="user-page__content">
        <img
          :src="item.book.img"
          :alt="item.book.title"
          class="user-page__content__img"
        />
        <div class="user-page__content__info">
          <p class="user-page__content__title">
            <strong
              >Book: {{ item.book.title }} /
              {{
                item.book.author.first_name + " " + item.book.author.last_name
              }}</strong
            >
          </p>
          <span class="user-page__content__date"
            ><em
              >Reservation date:
              {{
                new Date(item.data_reserve).toLocaleDateString() +
                " " +
                new Date(item.data_reserve).toLocaleTimeString()
              }}</em
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../utils/api";
import { mapState } from "vuex";
import "@/assets/styles/userPage.scss";
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
