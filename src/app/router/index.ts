import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import authRoutes from "./auth";

const routes: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: () => import("@/pages/SignIn/index.vue"),
  //   meta: {
  //     title: "Main home",
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

export default router;
