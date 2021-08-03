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
              {{ moment(item.date_reserved).format("YYYY-MM-DD hh:mm") }}</em
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getDateAndTime } from "@/utils/getDateAndTime.js";
import moment from "moment";

import "@/assets/styles/userPage.scss";
export default {
  data() {
    return {
      moment: moment,
      books: null,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.login.user,
      reservedBooks: (state) => state.books.reservedBooks,
    }),

    date(date) {
      return getDateAndTime(date);
    },
  },

  created() {
    this.getReservedBook();
  },

  methods: {
    ...mapActions({
      getReservedBooks: "books/getReservedBooks",
    }),

    async getReservedBook() {
      try {
        this.getReservedBooks();
        this.books = JSON.parse(JSON.stringify(this.reservedBooks)).filter(
          (book) => book.user._id === this.user._id
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
