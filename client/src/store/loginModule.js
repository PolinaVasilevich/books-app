import API from "@/utils/api";

export const loginModule = {
  state: () => ({
    status: "",
    errors: "",
    token: localStorage.getItem("token") || "",
    users: JSON.parse(localStorage.getItem("users")) || [],
    user: JSON.parse(localStorage.getItem("user")) || {},
    notReturnedBooks:
      JSON.parse(localStorage.getItem("notReturnedBooks")) || [],
  }),

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },

    authStatus(state) {
      return state.status;
    },

    isAdmin(state) {
      return !!state.user.isAdmin;
    },

    users(state) {
      return state.users;
    },

    user(state) {
      return state.user;
    },

    notReturnedBooks(state) {
      return state.notReturnedBooks;
    },

    status(state) {
      return state.status;
    },

    errors(state) {
      return state.errors;
    },
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },

    setErrors(state, errors) {
      state.errors = errors;
    },

    setToken(state, token) {
      state.token = token;
    },

    setUser(state, user) {
      state.user = user;
    },

    setUsers(state, users) {
      state.users = users;
    },

    logout(state) {
      state.status = "";
      state.token = "";
      state.user = {};
      state.notReturnedBooks = null;
    },

    setNotReturnedBooks(state, notReturnedBooks) {
      state.notReturnedBooks = notReturnedBooks;
    },
  },

  actions: {
    async getUsers({ commit }) {
      try {
        const users = await API.get("auth/users");
        localStorage.setItem("users", JSON.stringify(users.data));
        commit("setUsers", users.data);
      } catch (error) {
        console.log(error);
      }
    },

    async login({ commit }, user) {
      try {
        const data = await API.post("auth/login", { ...user });

        commit("setStatus", "loading");

        const { token, user: userInfo } = data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));

        commit("setUser", userInfo);
        commit("setToken", token);

        const books = await API.get(`books/not-returned-books/${userInfo._id}`);
        localStorage.setItem("notReturnedBooks", JSON.stringify(books.data));

        commit("setNotReturnedBooks", books.data);

        commit("setStatus", "loaded");
      } catch (error) {
        console.log(error);
        commit("setStatus", "error");
        commit("setErrors", error.response.data.message);
      }
    },

    async logout({ commit }) {
      try {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("status");
        localStorage.removeItem("notReturnedBooks");
      } catch (e) {
        console.log(e);
      }
    },

    async getNotReturnedBooks({ commit }, userID) {
      try {
        const books = await API.get(`books/not-returned-books/${userID}`);
        localStorage.setItem("notReturnedBooks", JSON.stringify(books.data));
        commit("setNotReturnedBooks", books.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  namespaced: true,
};
