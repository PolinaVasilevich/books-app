import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Admin from "@/views/Admin.vue";
import UserPage from "@/views/UserPage.vue";
import Secure from "@/views/Secure.vue";

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
  },

  {
    path: "/user",
    name: "User",
    component: UserPage,
  },

  {
    path: "/secure",
    name: "Secure",
    component: Secure,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
