import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

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
      menu: {
        icon: "home",
        textKey: "dashboard",
      },
    },
  },
  {
    path: "/lists",
    name: "lists",
    component: () => import("@/pages/Lists/index.vue"),
    meta: {
      title: "Lists",
      menu: {
        icon: "lists",
        textKey: "lists",
      },
    },
  },
  {
    path: "/analytics",
    name: "analytics",
    component: () => import("@/pages/Analytics/index.vue"),
    meta: {
      title: "Analytics",
      menu: {
        icon: "chart",
        textKey: "analytics",
      },
    },
  },
  {
    path: "/profile",
    name: "userProfile",
    component: () => import("@/pages/Profile/index.vue"),
    meta: {
      title: "Profile",
      menu: {
        icon: "profile",
        textKey: "profile",
      },
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
      showHeader: false,
      menu: {
        icon: "tools",
        textKey: "admin panel",
      },
    },
  },
  // {
  //   path: "/users/:id",
  //   name: "usersInfo",
  //   component: () => import("@/pages/Users/UserInfo.vue"),
  //   meta: {
  //     title: "Users",
  //     role: "admin",
  //     titleHeader: "",
  //     parent: {
  //       textKey: 'userInfo.backAllUsers',
  //       to: '/users'
  //     }
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
