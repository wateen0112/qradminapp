// import type { RouterMeta } from '@/models/interfaces/RouterMeta'
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { Layouts } from "@/models/enums/index";
import { beforeEach } from "./routerGaurds";
import { Management_Routes } from "./childs/main";
import { Settings_Routes } from "./childs/settings";
import { i18n } from "@/i18n"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect:"/home"
    },
    {
      path: "/home",
      component: () => import("@/views/dashboard/home/index.vue"),
      meta: {
        pageTitle: "home",
        layout: Layouts.Dashboard,
        roleName: "Public",
        needAuth:true
      },
    },
    {
      path: "/main/",
      name: i18n.global.t('breadcrumb.main'),
      children: Management_Routes,
      meta: {
        layout: Layouts.Dashboard,
        needAuth:true

      },
    },
    {
      path: "/setting/",
      name: i18n.global.t('breadcrumb.settings'),
      children: Settings_Routes,
      meta: {
        layout: Layouts.Dashboard,
      },
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/authentication/Login.vue"),
      meta: {
        pageTitle: "تسجيل الدخول",
        layout: Layouts.FullScreen,
        roleName: "Public",
        needAuth:false
      },
    },
    {
      path: "/ForgetPassword",
      name: "forgetPassword",
      component: () => import("../views/authentication/ForgetPassword.vue"),
      meta: {
        pageTitle: "تسجيل الدخول",
        layout: Layouts.FullScreen,
        roleName: "Public",
        needAuth:false

      },
    },
    {
      path: "/ResetPassword/",
      name: "resetPassword",
    props:true,
      component: () => import("../views/authentication/ResetPassword.vue"),
      meta: {
        pageTitle: "تسجيل الدخول",
        layout: Layouts.FullScreen,
        roleName: "Public",
        needAuth:false

      },
    },

  ] as RouteRecordRaw[],
});

router.beforeEach(beforeEach);

export default router;
