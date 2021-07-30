import API from "../utils/api";

export const loginModule = {
  state: () => ({
    status: "",
    token: localStorage.getItem("token") || "",
    users: JSON.parse(localStorage.getItem("users")) || [],
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

    setUsers(state, users) {
      state.users = users;
    },

    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
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
    // async login({ commit }, user) {
    //   try {
    //     commit("setStatus", "loading");
    //     const users = await API.post("auth/login", { ...user });
    //     const { token, user: userInfo } = users.data;

    //     localStorage.setItem("token", token);
    //     localStorage.setItem("user", JSON.stringify(userInfo));

    //     commit("setUser", userInfo);
    //     commit("setToken", token);
    //   } catch (e) {
    //     commit("setStatus", e.data);
    //     console.log(e);
    //     localStorage.removeItem("token");
    //   }
    // },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        API.post("auth/login", { ...user })
          .then((response) => {
            commit("setStatus", "loading");
            const { token, user: userInfo } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo));

            commit("setUser", userInfo);
            commit("setToken", token);
            resolve(user);
          })
          .catch((error) => {
            commit("setStatus", error.response.data.message);
            reject(error.response.data);
          });
      });
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
