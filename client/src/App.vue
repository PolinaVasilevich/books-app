<template>
  <div class="app">
    <!-- <i
      v-if="$route.path !== '/'"
      @click="getBack"
      class="bi bi-arrow-left arrow"
    ></i> -->

    <header
      id="header"
      class="header"
      :class="{
        'fixed-header': $route.path === '/',
        'show-header': isShowHeader,
      }"
    >
      <div class="header__logo">
        <h1>
          <router-link class="header__logo__link" to="/">Books App</router-link>
        </h1>
      </div>
      <nav class="header__nav">
        <div class="nav-list">
          <div class="nav-list__links">
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
          </div>
          <div>
            <span v-if="!isLoggedIn" class="nav-list__item nav-list__links"
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
        </div>
      </nav>
    </header>

    <router-view class="app__content" />
    <my-footer />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MyFooter from "@/components/Footer/MyFooter";

export default {
  components: { MyFooter },
  data() {
    return {
      isShowHeader: false,
      isShowSearchInput: false,
    };
  },
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

  mounted() {
    window.document.onscroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY > header.offsetTop) {
        this.isShowHeader = true;
      } else {
        this.isShowHeader = false;
      }
    };
  },
};
</script>

<style>
.arrow {
  font-size: 1.4em;
}
.app__content {
  flex: 1 0 auto;
}
.nav-list__links {
  position: relative;
}
.nav-list__item {
  padding: 3px 0;
  transition: opacity 0.5s;
}
.nav-list__links::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  display: inline-block;
  width: 1px;
  height: 13px;
  background-color: #000;
}

.hide-search-input {
  opacity: 0;
  width: 0;
  transition: opacity 0.5s;
}

.show-search-input {
  opacity: 1;
  width: 100%;
}
</style>
