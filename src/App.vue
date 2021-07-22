<template>
  <my-header>
    <my-button class="link"><router-link to="/">Home</router-link></my-button>
    <my-button v-if="isAdmin" class="link"
      ><router-link to="/admin">Admin</router-link></my-button
    >
    <my-button v-if="!isLoggedIn" class="link"
      ><router-link to="/login">Login</router-link></my-button
    >
    <my-button v-else @click="logout" class="link">Logout</my-button>
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
.link {
  font-size: 1.2em;
  cursor: pointer;
}

.router-link-active {
  color: #3498db;
}
</style>
