import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Authentication",
      layout: "auth",
      showHeader: true,
    },
  },
];

export default authRoutes;
