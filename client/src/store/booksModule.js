import API from "../utils/api";

export const booksModule = {
  state: () => ({ books: [] }),
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
  },

  actions: {
    async getBooks({ commit }) {
      try {
        const books = await API.get("books/allbooks");
        console.log(books.data);

        commit("setBooks", books.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  namespaced: true,
};
