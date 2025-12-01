import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/:mode(signin|signup)",
    name: "auth",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Authentication",
      layout: "auth",
    },
  },
];

export default authRoutes;
