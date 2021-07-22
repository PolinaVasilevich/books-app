import { createStore } from "vuex";
import users from "@/data/users";

export default createStore({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },

    auth_error(state, error) {
      state.status = error;
    },

    logout(state) {
      state.status = "";
      state.token = "";
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
          commit("auth_success", userInfo.token, userInfo);
          resolve();
        } else {
          commit("auth_error", "User not found");
          localStorage.removeItem("token");
          reject("User not found");
        }
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  modules: {},
});
