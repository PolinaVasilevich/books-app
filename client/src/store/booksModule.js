import API from "../utils/api";

export const booksModule = {
  state: () => ({
    books: JSON.parse(localStorage.getItem("books")) || [],
  }),

  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
  },

  actions: {
    async getBooks({ commit }) {
      try {
        const books = await API.get("books/allbooks");
        localStorage.setItem("books", JSON.stringify(books.data));
        commit("setBooks", books.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  namespaced: true,
};
