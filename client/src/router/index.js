import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Registration from "@/views/Registration.vue";
import BookPage from "@/views/BookPage.vue";

import UserPage from "@/views/UserPage.vue";
import UserChartPage from "@/views/UserChartPage.vue";
import Admin from "@/views/Admin/Admin.vue";
import AdminBooks from "@/views/Admin/AdminBooks.vue";
import AdminAuthors from "@/views/Admin/AdminAuthors.vue";
import AdminGenres from "@/views/Admin/AdminGenres.vue";
import AdminUsers from "@/views/Admin/AdminUsers.vue";
import AdminReservedBooks from "@/views/Admin/AdminReservedBooks.vue";
import AdminBookActions from "@/views/Admin/AdminBookActions.vue";
import AdminReviews from "@/views/Admin/AdminReviews.vue";
import AdminLibraries from "@/views/Admin/AdminLibraries.vue";
import AdminBookPage from "@/views/Admin/AdminBookPage.vue";
import AdminChart from "@/views/Admin/AdminChart.vue";

const routes = [
  {
    path: "/",
    name: "books",
    component: Home,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    props: true,
  },

  {
    path: "/registration",
    name: "registration",
    component: Registration,
  },

  {
    path: "/admin",
    name: "admin",
    component: Admin,

    children: [
      {
        path: "adminbooks",
        name: "adminBooks",
        component: AdminBooks,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
      },
      {
        path: "adminauthors",
        name: "adminAuthors",
        component: AdminAuthors,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
      },

      {
        path: "admingenres",
        name: "adminGenres",
        component: AdminGenres,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
      },

      {
        path: "adminusers",
        name: "adminUsers",
        component: AdminUsers,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
      },

      {
        path: "adminreservedBooks",
        name: "reservedBooks",
        component: AdminReservedBooks,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        props: true,
      },

      {
        path: "allbookactions",
        name: "bookactions",
        component: AdminBookActions,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
        props: true,
      },

      {
        path: "adminreviews",
        name: "reviews",
        component: AdminReviews,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
      },

      {
        path: "adminchart",
        name: "chart",
        component: AdminChart,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
      },

      {
        path: "adminlibraries",
        name: "libraries",
        component: AdminLibraries,
        meta: {
          requiresAuth: true,
          isAdmin: true,
        },
      },
    ],

    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },

  {
    path: "/adminbook/:id",
    name: "adminBookPage",
    component: AdminBookPage,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },

  {
    path: "/books/:id",
    name: "book",
    component: BookPage,
  },

  {
    path: "/user/:id",
    name: "userPage",
    component: UserPage,
    props: true,

    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/top/:id",
    name: "userChartPage",
    component: UserChartPage,
    meta: {
      requiresAuth: true,
    },
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
