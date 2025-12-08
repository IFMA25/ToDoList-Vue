import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Authentication",
      layout: "auth",
    },
    beforeEnter: (to) => {
      const mode = to.query.mode;
      if (mode !== "signup" && mode !== "signin") {
        return {
          name: "auth",
          query: {
            mode: "signin",
          },
        };
      }
    },
  },
];

export default authRoutes;
