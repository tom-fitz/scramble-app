import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { RouteNames } from "./routes";
import { UserViewTypes } from "@/modules/User/User";
import { getAuth } from "firebase/auth";

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
    path: "/logout",
    name: RouteNames.Logout,
    component: () =>
      import(/* webPackChunkName: "logout" */ "../modules/User/LogOutView.vue"),
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
        /* webPackChunkName: "dashboard" */ "../views/ProShopDashboard.vue"
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
        /* webPackChunkName: "scramble" */ "../modules/ProShop/Scramble.vue"
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

// router.beforeEach((to, from, next) => {
//   const auth = getAuth();

//   const currentUser = auth.currentUser;

//   console.log("current: ", currentUser);

//   if (currentUser !== undefined) {
//     const userType = to.matched.some(
//       (record) => record.meta.userViewType === UserViewTypes.ProShopView
//     );
//     userType ? next(RouteNames.ProShop.Dashboard) : next(RouteNames.Golfer.Map);
//   } else {
//     next(RouteNames.Login);
//   }
// });

export default router;
