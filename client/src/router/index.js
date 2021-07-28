import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import AllBooksPage from "@/views/AllBooksPage.vue";
import BookPage from "@/views/BookPage.vue";

import UserPage from "@/views/UserPage.vue";

const routes = [
  {
    path: "/",
    name: "books",
    component: AllBooksPage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },

  {
    path: "/books/:id",
    name: "book",
    component: BookPage,

    // meta: {
    //   requiresAuth: true,
    // },
  },

  {
    path: "/info",
    name: "userPage",
    component: UserPage,

    // meta: {
    //   requiresAuth: true,
    // },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // if (store.getters["login/isLoggedIn"] && store.getters["login/isAdmin"]) {
    if (store.getters["login/isLoggedIn"]) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
