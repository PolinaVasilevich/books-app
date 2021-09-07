import API from "../utils/api";

export const booksModule = {
  state: () => ({
    books: JSON.parse(localStorage.getItem("books")) || [],
    authors: JSON.parse(localStorage.getItem("authors")) || [],
    genres: JSON.parse(localStorage.getItem("genres")) || [],
    reservedBooks: JSON.parse(localStorage.getItem("reservedBooks")) || [],

    reviews: JSON.parse(localStorage.getItem("reviews")) || [],
    userReservedBooks:
      JSON.parse(localStorage.getItem("userReservedBooks")) || [],

    bookActions: JSON.parse(localStorage.getItem("bookActions")) || [],

    returnTodayBooks:
      JSON.parse(localStorage.getItem("returnTodayBooks")) || [],
  }),

  getters: {
    books(state) {
      return state.books;
    },

    authors(state) {
      return state.authors;
    },

    genres(state) {
      return state.genres;
    },

    reservedBooks(state) {
      return state.reservedBooks;
    },

    userReservedBooks(state) {
      return state.userReservedBooks;
    },

    reviews(state) {
      return state.reviews;
    },

    bookActions(state) {
      return state.bookActions;
    },

    returnTodayBooks(state) {
      return state.returnTodayBooks;
    },
  },

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

    setUserReservedBooks(state, userReservedBooks) {
      state.userReservedBooks = userReservedBooks;
    },

    setReviews(state, reviews) {
      state.reviews = reviews;
    },

    setBookActions(state, bookActions) {
      state.bookActions = bookActions;
    },

    setReturnTodayBooks(state, returnTodayBooks) {
      state.returnTodayBooks = returnTodayBooks;
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

    async getUserReservedBooks({ commit }, userID) {
      try {
        const userReservedBooks = await API.get(
          `books/reservedbooks/${userID}`
        );
        localStorage.setItem(
          "userReservedBooks",
          JSON.stringify(userReservedBooks.data)
        );
        commit("setUserReservedBooks", userReservedBooks.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getReviews({ commit }) {
      try {
        const reviews = await API.get("books/allreviews");
        localStorage.setItem("reviews", JSON.stringify(reviews.data));
        commit("setReviews", reviews.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getAllBookActions({ commit }) {
      try {
        const bookActions = await API.get("books/allbookactions");
        localStorage.setItem("bookActions", JSON.stringify(bookActions.data));
        commit("setBookActions", bookActions.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getReturnTodayBooks({ commit }, userID) {
      try {
        const books = await API.get(`books/return-today-books/${userID}`);
        localStorage.setItem("returnTodayBooks", JSON.stringify(books.data));
        commit("setReturnTodayBooks", books.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  namespaced: true,
};
