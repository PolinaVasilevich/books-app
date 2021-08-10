import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
      getAuthors: "books/getAuthors",
      getGenres: "books/getGenres",
      getReservedBooks: "books/getReservedBooks",
      getReviews: "books/getReviews",
      getUsers: "login/getUsers",
    }),
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "login/isLoggedIn",
      isAdmin: "login/isAdmin",
      users: "login/users",
      user: "login/user",

      books: "books/books",
      authors: "books/authors",
      genres: "books/genres",
      reservedBooks: "books/reservedBooks",
      reviews: "books/reviews",
    }),
  },
};