import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
      getAuthors: "books/getAuthors",
      getGenres: "books/getGenres",
      getReservedBooks: "books/getReservedBooks",
      getUserReservedBooks: "books/getUserReservedBooks",
      getReviews: "books/getReviews",
      getUsers: "login/getUsers",
      getAllBookActions: "books/getAllBookActions",
      getNotReturnedBooks: "login/getNotReturnedBooks",
      getReturnTodayBooks: "books/getReturnTodayBooks",
    }),
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "login/isLoggedIn",
      isAdmin: "login/isAdmin",
      users: "login/users",
      user: "login/user",
      status: "login/status",

      books: "books/books",
      authors: "books/authors",
      genres: "books/genres",
      reservedBooks: "books/reservedBooks",
      userReservedBooks: "books/userReservedBooks",
      reviews: "books/reviews",
      bookActions: "books/bookActions",

      notReturnedBooks: "login/notReturnedBooks",
      returnTodayBooks: "books/returnTodayBooks",
    }),
  },
};
