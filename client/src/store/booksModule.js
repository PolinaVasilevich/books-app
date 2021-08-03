import API from "../utils/api";

export const booksModule = {
  state: () => ({
    books: JSON.parse(localStorage.getItem("books")) || [],
    authors: JSON.parse(localStorage.getItem("authors")) || [],
    genres: JSON.parse(localStorage.getItem("genres")) || [],
    reservedBooks: JSON.parse(localStorage.getItem("reservedBooks")) || [],
  }),

  mutations: {
    setBooks(state, books) {
      state.books = books;
    },

    setAuthors(state, authors) {
      state.authors = authors;
    },

    setGenres(state, genres) {
      state.genres = genres;
    },

    setReservedBooks(state, reservedBooks) {
      state.reservedBooks = reservedBooks;
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

    async getAuthors({ commit }) {
      try {
        const authors = await API.get("books/allauthors");
        localStorage.setItem("authors", JSON.stringify(authors.data));
        commit("setAuthors", authors.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getGenres({ commit }) {
      try {
        const genres = await API.get("books/allgenres");
        localStorage.setItem("genres", JSON.stringify(genres.data));
        commit("setGenres", genres.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getReservedBooks({ commit }) {
      try {
        const reservedBooks = await API.get("books/allreservedbooks");
        localStorage.setItem(
          "reservedBooks",
          JSON.stringify(reservedBooks.data)
        );
        commit("setReservedBooks", reservedBooks.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  namespaced: true,
};
