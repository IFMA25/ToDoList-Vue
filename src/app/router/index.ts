import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import authRoutes from "./auth";
import { guards } from "./guards";


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Home/index.vue"),
    meta: {
      title: "Home",
      role: "user",
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      title: "Admin",
      role: "admin",
      permission: "READ_USERS",
    },
  },
  // {
  //   path: "/users/:id",
  //   name: "usersInfo",
  //   component: () => import("@/pages/Users/UserInfo.vue"),
  //   meta: {
  //     title: "Users",
  //     role: "admin",
  //   },
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/index.vue"),
    meta: {
      title: "404 - Page not found",
    },
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(guards);

export default router;
