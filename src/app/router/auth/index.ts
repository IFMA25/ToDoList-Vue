import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    name: "signin",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Authentication",
      layout: "auth",
    },
  },
];

export default authRoutes;
