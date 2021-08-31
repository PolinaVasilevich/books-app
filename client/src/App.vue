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
              ><router-link class="header__link header__text" to="/"
                >Home</router-link
              ></span
            >

            <span v-if="isAdmin" class="nav-list__item"
              ><router-link
                class="header__link header__text"
                to="/admin/adminbooks"
                >Admin</router-link
              ></span
            >
            <span v-if="isLoggedIn && !user.isAdmin" class="nav-list__item"
              ><router-link
                class="header__link header__text"
                :to="{ name: 'userPage', params: { id: user._id } }"
                >My books</router-link
              ></span
            >
          </div>
          <div class="nav-list__links">
            <span v-if="!isLoggedIn" class="nav-list__item nav-list__links"
              ><router-link class="header__link header__text" to="/login"
                >Login</router-link
              ></span
            >

            <span v-if="!isLoggedIn" class="nav-list__item"
              ><router-link class="header__link header__text" to="/registration"
                >Register</router-link
              ></span
            >

            <span
              v-else
              class="nav-list__item header__link header__text"
              @click="logout"
              >Logout</span
            >
          </div>
          <div>
            <router-link
              :to="{ name: 'userChartPage', params: { id: user._id } }"
            >
              <Button
                v-if="isLoggedIn"
                type="button"
                :label="user.username"
                icon="pi pi-user"
                class="
                  p-button-text p-button-text
                  header__text header__text-button
                "
                :badge="badgeNotReturned"
                badgeClass="p-badge-danger"
              />
            </router-link>
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
import dataStore from "@/mixins/dataStore.js";

export default {
  components: { MyFooter },
  mixins: [dataStore],
  data() {
    return {
      isShowHeader: false,
      isShowSearchInput: false,
      badgeNotReturned: null,
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

    getBooksWhichNotReturned() {
      const today = new Date().setHours(0, 0, 0, 0);
      const booksWhichNotReturned = this.userReservedBooks.filter((elem) => {
        return elem.details.filter((innerElem) => {
          return (
            innerElem.status === "Received" &&
            new Date(innerElem.return_date).setHours(0, 0, 0, 0) < today &&
            new Date(innerElem.return_date).setHours(0, 0, 0, 0) !== today
          );
        })?.length;
      });
      this.badgeNotReturned = booksWhichNotReturned?.length;
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
    this.getReservedBooks();
    this.getBooksWhichNotReturned();
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
