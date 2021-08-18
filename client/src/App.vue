<template>
  <div class="app">
    <i
      v-if="$route.path !== '/'"
      @click="getBack"
      class="bi bi-arrow-left arrow"
    ></i>
    <my-header>
      <my-button
        ><router-link class="header__link" to="/">Home</router-link></my-button
      >
      <my-button v-if="isAdmin"
        ><router-link class="header__link" to="/admin/adminbooks"
          >Admin</router-link
        ></my-button
      >
      <my-button v-if="isLoggedIn && user.username !== 'admin'"
        ><router-link
          class="header__link"
          :to="{ name: 'userPage', params: { id: user._id } }"
          >My books</router-link
        ></my-button
      >
      <my-button v-if="!isLoggedIn"
        ><router-link class="header__link" to="/login"
          >Login</router-link
        ></my-button
      >

      <my-button v-else @click="logout" class="header__link">Logout</my-button>

      <!-- <span>
        <i class="pi pi-user"></i>
      </span> -->
    </my-header>

    <router-view class="app__content" />
  </div>
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

.header__link {
  display: inline-block;
  position: relative;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #484848;
  vertical-align: baseline;
  padding: 8px 0;

  text-decoration: none;
}

.header__link:hover,
.router-link-active {
  color: #f66e5e;
}
/* 
.router-link-active::after {
  position: absolute;
  content: "";
  bottom: 0;
  left: 15%;
  transform: scale(1);
  background-color: #f66e5e;
  height: 2px;
  width: 60%;
  transition: 0.2s;
} */
</style>
