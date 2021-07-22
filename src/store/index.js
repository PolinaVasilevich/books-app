import { createStore } from "vuex";
import users from "@/data/users";

export default createStore({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },

    auth_success(state, user) {
      state.status = "success";
      state.token = user.token;
      state.user = user;
    },

    auth_error(state, error) {
      state.status = error;
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
        commit("auth_request");

        const userInfo = users.find((u) => {
          return u.username === user.username && u.password === user.password;
        });

        if (userInfo) {
          localStorage.setItem("token", userInfo.token);
          localStorage.setItem("user", JSON.stringify(userInfo));

          commit("auth_success", userInfo);
          resolve();
        } else {
          commit("auth_error", "User not found");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          reject("User not found");
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
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    isAdmin: (state) => !!state.user.isAdmin,
  },
  modules: {},
});
