<template>
  <div class="app">
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
          <router-link class="header__logo__link" to="/">
            <img
              src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-5-single-image-3.png"
              alt="logo"
              style="width: 70px"
            />
          </router-link>
        </h1>
      </div>

      <nav class="header__nav">
        <div class="nav-list">
          <menu-header
            class="nav-list__menu"
            :isLogin="isLoggedIn"
            :currentUser="currentUser"
            :isAdmin="user?.isAdmin"
            @logout="openModal"
            :notReturnedBooks="notReturnedBooks"
          />

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
              @click="openModal"
              >Logout</span
            >

            <div
              v-if="isLoggedIn"
              class="nav-list__item"
              style="margin-left: 0"
            >
              <router-link
                :to="{
                  name: 'userPage',
                  params: {
                    id: user._id,
                    notReturned: !!notReturnedBooks?.length,
                  },
                }"
              >
                <Button
                  type="button"
                  :label="user.username"
                  icon="pi pi-user"
                  class="
                    p-button-text p-button-text
                    header__text header__text-button
                  "
                  :badge="notReturnedBooks?.length"
                  badgeClass="p-badge-danger"
                />
              </router-link>
            </div>
          </div>
        </div>
      </nav>
      <Dialog v-model:visible="displayModal" :style="{ width: '500px' }">
        <div
          class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3"
          style="padding-top: 0 !important"
        >
          <img
            src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/home-5-single-image-4.png"
            alt="buy"
            style="width: 188, height: 124"
          />
          <div style="text-align: center">
            <h4>Are you sure you want to leave our website?</h4>
          </div>
        </div>
        <template #footer>
          <div class="p-d-flex p-jc-center">
            <Button
              class="p-button p-component p-button-text"
              label="Yes"
              icon="pi pi-check"
              @click="confirmLogout"
            />
            <Button
              class="p-button p-component p-button-text"
              label="Cancel"
              icon="pi pi-times"
              @click="closeModal"
            />
          </div>
        </template>
      </Dialog>
    </header>

    <router-view class="app__content" />
    <my-footer />
  </div>
</template>

<script>
import MyFooter from "@/components/Footer/MyFooter";
import MenuHeader from "@/components/MenuHeader";

import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";
export default {
  components: { MyFooter, MenuHeader },
  mixins: [dataStore, toggle],
  data() {
    return {
      isShowHeader: false,
      isShowSearchInput: false,
    };
  },
  methods: {
    confirmLogout() {
      this.closeModal();
      this.logout();
    },

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
    currentUser() {
      return { ...this.user };
    },
  },

  mounted() {
    this.getReservedBooks();
    if (this.isLoggedIn) {
      this.getNotReturnedBooks(this.user?._id);
    }

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
