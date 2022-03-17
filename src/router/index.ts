import { mapStores } from "pinia";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Map from "../views/Map.vue";
import { RouteNames } from "./routes";
import { UserViewTypes } from "@/modules/User/User";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: RouteNames.Login,
    component: () =>
      import(/* webPackChunkName: "login" */ "../modules/User/LoginView.vue"),
  },
  {
    path: "/register",
    name: RouteNames.Register,
    component: () =>
      import(
        /* webPackChunkName: "register" */ "../modules/User/RegisterView.vue"
      ),
  },
  {
    path: "/golfer/map",
    name: RouteNames.Golfer.Map,
    component: () => import(/* webPackChunkName: "map" */ "../views/Map.vue"),
    meta: {
      userViewType: UserViewTypes.GolferView,
    },
  },
  {
    path: "/pro-shop/dashboard",
    name: RouteNames.ProShop.Dashboard,
    component: () =>
      import(
        /* webPAckChunkName: "dashboard" */ "../views/ProShopDashboard.vue"
      ),
    meta: {
      userViewType: UserViewTypes.ProShopView,
    },
  },
  {
    path: "/pro-shop/dashboard",
    name: RouteNames.ProShop.Dashboard,
    component: () =>
      import(
        /* webPAckChunkName: "dashboard" */ "../views/ProShopDashboard.vue"
      ),
    meta: {
      userViewType: UserViewTypes.ProShopView,
    },
  },
  {
    path: "/pro-shop/scramble",
    name: RouteNames.ProShop.Scramble,
    component: () =>
      import(
        /* webPAckChunkName: "dashboard" */ "../views/ProShopDashboard.vue"
      ),
    meta: {
      userViewType: UserViewTypes.ProShopView,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
