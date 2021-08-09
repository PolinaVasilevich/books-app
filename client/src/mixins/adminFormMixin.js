import { mapActions, mapState, mapGetters } from "vuex";

import API from "@/utils/api";

export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
      getAuthors: "books/getAuthors",
      getGenres: "books/getGenres",
      getReservedBooks: "books/getReservedBooks",
      getReviews: "books/getReviews",
      getUsers: "login/getUsers",
    }),

    async addNewRecord(path, payload, callback) {
      try {
        await API.post(path, payload);
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    async removeData(path, callback) {
      try {
        await API.delete(path);
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    async updateData(path, payload, callback) {
      try {
        await API.put(path, payload);
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    async createRecord(path, payload) {
      try {
        await API.post(path, payload);
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapState({
      books: (state) => state.books.books,
      authors: (state) => state.books.authors,
      genres: (state) => state.books.genres,
      reservedBooks: (state) => state.books.reservedBooks,
      reviews: (state) => state.books.reviews,
      users: (state) => state.login.users,
      user: (state) => state.login.user,
    }),

    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
  },
};
