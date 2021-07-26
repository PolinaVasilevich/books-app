import users from "@/data/users";

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
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("setStatus", "loading");

        const userInfo = users.find((u) => {
          return u.username === user.username && u.password === user.password;
        });

        if (userInfo) {
          localStorage.setItem("token", userInfo.token);
          localStorage.setItem("user", JSON.stringify(userInfo));

          commit("setUser", userInfo);
          commit("setToken", userInfo.token);

          resolve();
        } else {
          commit("setStatus", "User not found");

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          reject();
        }
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        resolve();
      });
    },
  },
  namespaced: true,
};
