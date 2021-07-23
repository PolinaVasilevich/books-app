import axios from "axios";

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
        const url = "https://api.itbook.store/1.0/new";
        const proxyURL = "https://cors-anywhere.herokuapp.com/";
        const updatedURL = `${proxyURL}${url}`;
        const books = await axios(updatedURL);

        console.log(books);

        commit("setBooks", books.data.books);
      } catch (error) {
        console.log(error);
      }
    },
  },
  namespaced: true,
};
