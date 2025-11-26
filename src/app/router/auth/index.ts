import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Sign in",
    },
  },
];

export default authRoutes;
