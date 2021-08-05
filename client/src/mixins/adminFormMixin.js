import { mapActions, mapState } from "vuex";

import API from "@/utils/api";

export default {
  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
      getAuthors: "books/getAuthors",
      getGenres: "books/getGenres",
      getReservedBooks: "books/getReservedBooks",
      getUsers: "login/getUsers",
    }),

    async addNewRecord(path, payload, callback) {
      try {
        console.log(callback);
        await API.post(path, payload);
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    resetForm(dataForm) {
      const newDataForm = {};
      Object.keys(dataForm).forEach((item) => (dataForm[item] = ""));
      return newDataForm;
    },

    async removeData(path, callback) {
      try {
        await API.delete(path);
        callback();
        // this.message = "Genre removed!";
        // this.showMessage = true;
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    async updateData(path, payload, callback) {
      try {
        await API.put(path, payload);
        callback();
        // this.message = "Book updated!";
        // this.showMessage = true;
      } catch (error) {
        console.log(error);
        callback();
      }
    },
  },

  computed: {
    ...mapState({
      books: (state) => state.books.books,
      authors: (state) => state.books.authors,
      genres: (state) => state.books.genres,
      reservedBooks: (state) => state.books.reservedBooks,
      users: (state) => state.login.users,
    }),
  },
};
