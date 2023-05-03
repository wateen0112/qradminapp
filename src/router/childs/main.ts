import { Layouts } from "@/models/enums/index";
import type BreadCrumb from "@/models/types/BreadCrumb";
import type { RouteRecordRaw } from "vue-router";
import { i18n } from "@/i18n";

export const Management_Routes: Array<RouteRecordRaw> = [
  {
    path: "customersAccount",
    name: "customersAccount",
    component: () =>
      import("@/views/dashboard/customersAccount/customersAccount.vue"),
    meta: {
      title: "مستخدمو اللوحة",
      needAuth: true,
      backBtn: false,
      breadCrumb: [
        {
          text: i18n.global.t("customers.customerAccountManagement"),
          disabled: true,
          href: "/",
        },
      ] as Array<BreadCrumb>,
      layout: Layouts.Dashboard,
      roleName: "Admin",
    },
  },
  {
    path: "customersAccount/:id",
    props: true,
    name: "customersAccountDetails",
    component: () =>
      import("@/views/dashboard/customersAccount/pages/customerDetails.vue"),
    meta: {
      title: "مستخدمو اللوحة",
      needAuth: true,
      backBtn: false,
      breadCrumb: [
        {
          text: i18n.global.t("customers.customerAccountManagement"),
          disabled: true,
          href: "/customersAccount",
        },
        {
          text: i18n.global.t("customers.details"),
          disabled: true,
          href: "/customersAccount/:id",
        },
      ] as Array<BreadCrumb>,
      pageTitle: "تفاصيل إدارة حساب العملاء",
      layout: Layouts.Dashboard,
      roleName: "Admin",
    },
  },
  {
    path: "customersAccount/:id/versionsQr",
    props: true,
    name: "versionsQr",
    component: () =>
      import("@/views/dashboard/customersAccount/pages/versionQr.vue"),
    meta: {
      title: "مستخدمو اللوحة",
      breadCrumb: [
        {
          text: i18n.global.t("customers.versionsQr"),
          disabled: true,
          href: "/customersAccount/:id",
        },
      ] as Array<BreadCrumb>,
      pageTitle: "اصدارات qr",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      needAuth: true,
    },
  },
  // {
  //   path: "userAccaonnt/:id",
  //   name: "detailsUsers",
  //   props: true,
  //   component: () => import("../../views/userAccaonnt/components/detailsUsers.vue"),
  //   meta: {
  //     title: "userAccaonnt",
  //     backBtn: false,
  //     breadCrumb: [
  //       {
  //         text: "Main",
  //         disabled: true,
  //         href: "/",
  //       },
  //       {
  //         text: "userAccaonnt",
  //         disabled: true,
  //         href: "/",
  //       },
  //       {
  //         text: "detailsUsers",
  //         disabled: true,
  //         href: "/",
  //       },
  //     ] as Array<BreadCrumb>,
  //   },
  // },
  {
    path: "serviceNfc",
    name: "serviceNfc",
    component: () => import("@/views/dashboard/serviceNfc/serviceNfc.vue"),
    meta: {
      pageTitle: "خدمة Nfc",
      layout: Layouts.Dashboard,
      roleName: "Admin",
      needAuth: true,
      breadCrumb: [
        {
          text: i18n.global.t("pageName.nfcService"),
          disabled: true,
          href: "/serviceNfc",
        },
      ],
      title: "NFC",
    },
  },
  {
    path: "subscriptions",
    name: "subscriptions",
    component: () =>
      import("@/views/dashboard/subscriptions/subscriptions.vue"),
    meta: {
      pageTitle: " إدارة الاشتراكات",
      layout: Layouts.Dashboard,
      needAuth: true,
      roleName: "Admin",
      breadCrumb: [
        {
          text: i18n.global.t("pageName.subsecriptionManagement"),
          disabled: true,
          href: "/serviceNfc",
        },
      ],
      title: "Subscriptions",
    },
  },
  // {
  //   path: "userAccaonnt",
  //   name: "userAccaonnt",
  //   component: () => import("../../views/userAccaonnt/userAccaonnt.vue"),
  //   meta: {
  //     title: "userAccaonnt",

  //     backBtn: false,
  //     breadCrumb: [
  //       {
  //         text: "Main",
  //         disabled: true,
  //         href: "/",
  //       },
  //       {
  //         text: "userAccaonnt",
  //         disabled: true,
  //         href: "/",
  //       },
  //     ] as Array<BreadCrumb>,
  //   },
  // },
  // {
  //   path: "userAccaonnt/:id",
  //   name: "detailsUsers",
  //   props: true,
  //   component: () => import("../../views/userAccaonnt/pages/detailsUsers.vue"),
  //   meta: {
  //     title: "userAccaonnt",
  //     backBtn: false,
  //     breadCrumb: [
  //       {
  //         text: "Main",
  //         disabled: true,
  //         href: "/",
  //       },
  //       {
  //         text: "userAccaonnt",
  //         disabled: true,
  //         href: "/",
  //       },
  //       {
  //         text: "detailsUsers",
  //         disabled: true,
  //         href: "/",
  //       },
  //     ] as Array<BreadCrumb>,
  //   },
  // },
];
