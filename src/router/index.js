import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import UserPage from "@/views/UserPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/user",
    name: "User",
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (store.getters["login/isLoggedIn"] && store.getters["login/isAdmin"]) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
