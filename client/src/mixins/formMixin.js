import API from "@/utils/api";
import { mapActions, mapState } from "vuex";

export default {
  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
    isShowMessage: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isShowEditModal: false,
      editForm: {},
    };
  },

  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
      getAuthors: "books/getAuthors",
      getGenres: "books/getGenres",
      getReservedBook: "books/getReservedBook",
      getUsers: "login/getUsers",
    }),

    closeModal() {
      this.$emit("update:isShowModal", false);
    },

    async addNewRecord(path, payload, callback) {
      try {
        await API.post(path, payload);
        this.$emit("showMessage", "New Record added!");
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    async removeRecord(path, callback) {
      try {
        await API.delete(path);
        this.$emit("showMessage", "New Record added!");
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    async updateRecord(path, payload, callback) {
      try {
        await API.put(path, payload);
        this.$emit("showMessage", "Book updated!");
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    editData(data) {
      this.editForm = data;
    },

    resetForm(formData) {
      const newForm = {};
      Object.keys(formData).forEach((item) => (newForm[item] = ""));
      return newForm;
    },
  },

  computed: {
    ...mapState({
      books: (state) => state.books.authors,
      authors: (state) => state.books.authors,
      genres: (state) => state.books.genres,
      reservedBooks: (state) => state.books.reservedBooks,
      users: (state) => state.books.users,
    }),
  },
};
