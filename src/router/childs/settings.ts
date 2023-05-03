// import type BreadCrumb from "@/models/types/BreadCrumb";
import { Layouts } from "@/models/enums/index";
import type BreadCrumb from "@/models/types/BreadCrumb";
import type { RouteRecordRaw } from "vue-router";
import { i18n } from "@/i18n";
export const Settings_Routes: Array<RouteRecordRaw> = [
  {
    path: "qrtypes",
    name: "qrtypes",
    component: () => import("@/views/dashboard/qrtypes/QrTypes.vue"),
    meta: {
      pageTitle: "أنواع QR ",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      needAuth: true,
      title: "Qr Types",
      breadCrumb: [
        {
          text: i18n.global.t("pageName.qrTypes"),
          disabled: true,
          href: "/userDashboard",
          icon: "mdi mdi-account",
        },
      ],
    },
  },
  {
    path: "commonQuestions",
    name: "commonQuestions",
    component: () =>
      import("@/views/dashboard/commonQuestions/commonQuestions.vue"),
    meta: {
      pageTitle: "commonQuestions",
      layout: Layouts.Dashboard,
      needAuth: true,
      title: "Common Questions",
      roleName: "Admin",
      breadCrumb: [
        {
          text: i18n.global.t("pageName.commonQuestion"),
          disabled: true,
          href: "/userDashboard",
          icon: "mdi mdi-account",
        },
      ] as BreadCrumb[],
    },
  },
  {
    path: "contact",
    name: "contactUs",
    component: () => import("@/views/dashboard/contactUs/contactUs.vue"),
    meta: {
      pageTitle: "contactUs",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      needAuth: true,
      title: "contact us",
      breadCrumb: [
        {
          text: i18n.global.t("pageName.ConnectWithUs"),
          disabled: true,
          href: "/contact",
          icon: "mdi mdi-account",
        },
      ] as BreadCrumb[],
    },
  },
  {
    path: "contact/:id",
    props: true,
    name: "contactUsDetails",
    component: () =>
      import("@/views/dashboard/contactUs/pages/ContactUsDetails.vue"),
    meta: {
      title: "تواصل معنا",
      needAuth: true,
      backBtn: false,
      breadCrumb: [
        {
          text: " طلبات التواصل",
          disabled: true,
          href: "/",
        },
        {
          text: "تفاصيل الطلب",
          disabled: true,
          href: "/",
        },
      ] as Array<BreadCrumb>,
      pageTitle: "تفاصيل البريد ",
      layout: Layouts.Dashboard,
      roleName: "Admin",
    },
  },
  {
    path: "qrtypes",
    name: "qrtypes",
    component: () => import("@/views/dashboard/qrtypes/QrTypes.vue"),
    meta: {
      needAuth: true,
      title: "Qr Types",

      pageTitle: "انواع Qr",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      breadCrumb: [
        {
          disabled: true,
          text: i18n.global.t("pageName.qrTypes"),
          href: "/qrtypes",
        },
      ],
    },
  },
  {
    path: "statistics",
    name: "statistics",
    component: () => import("@/views/dashboard/statistics/statistics.vue"),
    meta: {
      needAuth: true,
      title: "Stats",
      pageTitle: "الاحصائيات",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      breadCrumb: [
        {
          text: i18n.global.t("pageName.statistics"),
          disabled: true,
          href: "/statistics",
        },
      ],
    },
  },
  {
    path: "userDashboard",
    name: "userDashboard",
    component: () => import("@/views/DashboardUser/DashboardUser.vue"),
    meta: {
      needAuth: true,
      title: "Users",

      pageTitle: "مستخدمو اللوحة",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      breadCrumb: [
        {
          text: i18n.global.t("pageName.DashboardUser"),
          disabled: true,
          href: "/userDashboard",
        },
      ] as BreadCrumb[],
    },
  },
  {
    path: "settings",
    name: "settings",
    component: () => import("@/views/dashboard/settings/settings.vue"),
    meta: {
      pageTitle: "الاعدادات",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      title: "Setting",
      needAuth: true,
      breadCrumb: [
        {
          disabled: true,
          text: i18n.global.t("pageName.settings"),
          href: "/settings",
          icon: "mdi mdi-account",
        },
      ],
    },
  },
  // {
  //     path: "adminstratorAccounts",
  //     name: "adminstratorAccounts",
  //     component: () =>
  //         import("@/views/dashboard/adminstratorAccounts/AdminstratorAccount.vue"),
  //     meta: {
  //         title: "AdminstratorAccounts",
  //         backBtn: false,
  //         breadCrumb: [
  //             {
  //                 text: "Setting",
  //                 disabled: true,
  //                 href: "/",
  //             },
  //             {
  //                 text: "AdminstratorAccounts",
  //                 disabled: true,
  //                 href: "/",
  //             },
  //         ] as Array<BreadCrumb>,
  //     },
  // },
];
