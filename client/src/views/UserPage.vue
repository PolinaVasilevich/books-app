<template>
  <div class="user-page">
    <h1>My Books</h1>
    <div>
      <div
        v-for="item in userReservedBooks"
        :key="item._id"
        class="user-page__content"
      >
        <router-link :to="{ name: 'book', params: { id: item.book._id } }">
          <img
            :src="item.book.img"
            :alt="item.book.title"
            class="user-page__content__img"
          />
        </router-link>

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
import moment from "moment";
import dataStore from "@/mixins/dataStore.js";

export default {
  mixins: [dataStore],
  data() {
    return {
      moment: moment,
      userReservedBooks: null,
    };
  },

  methods: {
    async getUserReservedBook() {
      try {
        this.getReservedBooks();
        this.userReservedBooks = [
          ...this.reservedBooks.filter(
            (book) =>
              book.user._id === this.user._id && book.status === "Reserved"
          ),
        ];
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getUserReservedBook();
  },
};
</script>
