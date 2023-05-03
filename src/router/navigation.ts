import type { NavigationItem } from "@/models/types/base";

const NavLinks: Array<NavigationItem> = [
  {
    title:"sideBar.main",
    path: "/home",
    icon: "mdi-home",
    role: "",
  },
  {
    header: "sideBar.contentManagement",
  },

  {
    title: "sideBar.accountsManagement",
    path: "/main/customersAccount",
    icon: "mdi-account-multiple ",
    role: "",
  },
  {
    title: "sideBar.subsecriptionsManagement",
    path: "/main/subscriptions",
    icon: "mdi-cube",
    role: "",
  },
  // {
  //   title: "sideBar.nfcService",
  //   path: "/main/serviceNfc",
  //   icon: "mdi-nfc-tap",
  //   role: "",
  // },
  {
    header: "sideBar.settings",
  },
  {
    title:  "sideBar.commonQuestions",
    path: "/setting/commonQuestions",
    icon: "mdi-lightbulb-question",
    role: "",
  },
  {
    title: "sideBar.contactUs",
    path: "/setting/contact",
    icon: "mdi-phone",
    role: "",
  },
  {
    title:  "sideBar.qrTypes",
    path: "/setting/qrtypes",
    icon: "mdi-ev-plug-type1",
    role: "",
  },
  {
    title:  "sideBar.statistics",
    path: "/setting/statistics",
    icon: "mdi-chart-scatter-plot-hexbin ",
    role: "",
  },

  {
    title: "sideBar.dashboardUsers",
    path: "/setting/userDashboard",
    icon: "mdi-logout",
    role: "",
  },
  {
    title:  "sideBar.settings",
    path: "/setting/settings",
    icon: "mdi-cog-outline ",
    role: "",
  },
];
export { NavLinks };
