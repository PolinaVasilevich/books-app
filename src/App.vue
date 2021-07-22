<template>
  <my-header>
    <my-button class="btn"><router-link to="/">Home</router-link></my-button>
    <my-button v-if="isAdmin"
      ><router-link to="/admin">Admin</router-link></my-button
    >
    <my-button v-if="!isLoggedIn" class="btn"
      ><router-link to="/login">Login</router-link></my-button
    >
    <my-button v-else @click="logout">Logout</my-button>
  </my-header>
  <router-view />
</template>

<script>
import { mapGetters } from "vuex";
import MyHeader from "@/components/MyHeader.vue";

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
    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  color: #000;
  text-decoration: none;
}

.btn:hover {
  cursor: pointer;
  background-color: rgba(230, 225, 225, 0.938);
}
</style>
