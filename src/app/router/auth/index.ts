import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth/:mode",
    name: "auth",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Authentication",
    },
  },
  {
    path: "/signin",
    redirect: "/auth/signin",
  },
  {
    path: "/signup",
    redirect: "/auth/signup",
  },
];

export default authRoutes;
