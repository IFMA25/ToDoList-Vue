import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home/index.vue"),
    meta: {
      title: "Home - Vue 3 Starter",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/index.vue"),
    meta: {
      title: "404 - Сторінку не знайдено",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login/index.vue"),
    meta: {
      title: "Login - Vue 3 Starter",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register/index.vue"),
    meta: {
      title: "Register - Vue 3 Starter",
    },
  },
  {
    path: "/admprofiles",
    name: "AdminProfiles",
    component: () => import("@/pages/Admin-Profiles/index.vue"),
    meta: {
      title: "Register - Vue 3 Starter",
    },
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
