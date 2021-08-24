<template>
  <div class="app">
    <div
      v-if="$route.path == '/'"
      :style="{
        backgroundImage: `url(http://subsolardesigns.com/leona/wp-content/uploads/2019/04/hero_image2_clear.jpg)`,
        width: '100%',
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>
    <i
      v-if="$route.path !== '/'"
      @click="getBack"
      class="bi bi-arrow-left arrow"
    ></i>

    <header class="header">
      <div class="header__logo">
        <h1>
          <router-link class="header__logo__link" to="/">Books App</router-link>
        </h1>
      </div>
      <nav class="header__nav">
        <div class="nav-list">
          <span class="nav-list__item"
            ><router-link class="header__link" to="/">Home</router-link></span
          >

          <span v-if="isAdmin" class="nav-list__item"
            ><router-link class="header__link" to="/admin/adminbooks"
              >Admin</router-link
            ></span
          >
          <span v-if="isLoggedIn && !user.isAdmin" class="nav-list__item"
            ><router-link
              class="header__link"
              :to="{ name: 'userPage', params: { id: user._id } }"
              >My books</router-link
            ></span
          >

          <span v-if="!isLoggedIn" class="nav-list__item"
            ><router-link class="header__link" to="/login"
              >Login</router-link
            ></span
          >

          <span v-if="!isLoggedIn" class="nav-list__item"
            ><router-link class="header__link" to="/registration"
              >Register</router-link
            ></span
          >

          <span v-else class="nav-list__item header__link" @click="logout"
            >Logout</span
          >
        </div>
      </nav>
    </header>

    <router-view class="app__content" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch("login/logout").then(() => {
        this.$router.push("/");
      });
    },

    getBack() {
      this.$router.go(-1);
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
.arrow {
  font-size: 1.4em;
}
</style>
