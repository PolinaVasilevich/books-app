<template>
  <my-header>
    <my-button><router-link class="link" to="/">Home</router-link></my-button>
    <my-button v-if="isAdmin"
      ><router-link class="link" to="/admin">Admin</router-link></my-button
    >
    <my-button v-if="isLoggedIn"
      ><router-link
        class="link"
        :to="{ name: 'userPage', params: { id: user._id } }"
        >My books</router-link
      ></my-button
    >
    <my-button v-if="!isLoggedIn"
      ><router-link class="link" to="/login">Login</router-link></my-button
    >

    <my-button v-else @click="logout" class="link">Logout</my-button>
  </my-header>
  <router-view />
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MyHeader from "@/components/MyHeader/MyHeader";

export default {
  components: { MyHeader },
  methods: {
    logout() {
      this.$store.dispatch("login/logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    ...mapState("login", {
      user: (state) => state.user,
    }),

    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
  },
};
</script>

<style>
.link,
.router-link {
  color: #000;
  text-decoration: none;
  font-size: 1.2em;
  cursor: pointer;
}

.router-link:hover {
  color: #fff;
}

.router-link-active {
  color: #3498db;
}
</style>
