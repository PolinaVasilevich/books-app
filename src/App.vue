<template>
  <my-header>
    <my-button class="btn"><router-link to="/">Home</router-link></my-button>
    <my-button v-if="!isLoggedIn" class="btn"
      ><router-link to="/login">Login</router-link></my-button
    >
    <my-button v-else @click="logout">Logout</my-button>
  </my-header>
  <router-view />
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";

export default {
  components: { MyHeader },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
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
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
