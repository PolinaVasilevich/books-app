import API from "../utils/api";

export const loginModule = {
  state: () => ({
    status: "",
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
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
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },

    setToken(state, token) {
      state.token = token;
    },

    setUser(state, user) {
      state.user = user;
    },

    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
    },
  },

  actions: {
    async login({ commit }, user) {
      try {
        commit("setStatus", "loading");
        const users = await API.post("auth/login", { ...user });
        const token = users.data.token;
        const userInfo = users.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));

        commit("setUser", userInfo);
        commit("setToken", token);
      } catch (e) {
        commit("auth_error");
        localStorage.removeItem("token");
      }
    },

    async logout({ commit }) {
      try {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
