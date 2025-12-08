import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import authRoutes from "./auth";

import { tokenManager } from "@/shared/api";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Home/index.vue"),
    meta: {
      title: "Home",
    },
  },
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

router.beforeEach((to) => {
  const token = tokenManager.getAccessToken();
  if (!token && to.meta.layout !== "auth") {
    return ({ name: "auth" });
  }
  if (token && to.name === "auth") {
    return ({ name: "home" });
  }
});

export default router;
