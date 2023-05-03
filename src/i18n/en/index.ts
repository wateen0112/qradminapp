import { qrTypes } from "./qrTypes";
import { settings } from "./settings";
import { subsecriptionTypes } from "./subsecriptionTypes";
import { customers } from "./customer";
import { sideBar } from "./sidebar";
import { nfcService } from "./nfcService";
import { forgetPassword } from "./forgetPassword";
import { contact } from "./contact"
import { commonQuestion } from "./commonQuestion"
export const en = {
  ...qrTypes,
  ...settings,
  ...subsecriptionTypes,
  ...customers,
  ...sideBar,
  ...nfcService,
  ...sideBar,
  ...forgetPassword,
  ...contact,
  ...commonQuestion,
  breadcrumb: {
    main: "Content Management",
    settings: "Settings",
  },
  pageName: {
    commonQuestion: " commonQuestion",
    customerAccountManagement: "customerAccountManagement",
    subsecriptionManagement: "subsecriptionManagement",
    nfcService: " nfcService",
    qrTypes: "qrTypes",
    ConnectWithUs: "ConnectWithUs ",
    DashboardUser: "DashboardUser ",
    settings: "settings",
    statistics: "statistics",
  },
  login: {
    login: "login",
    email: " email",
    password: " password",
    passwordError: "password is required",
    emailError: "email is required ",
    unSupportEmail: " unsupport email ",
    loginerror: "wrong in information",
    invalidpassword: " password is not correct please make sure it  ",
    servererror: "server problem please try again",
  },
  home: {
    numberUsers: "numberUsers ",
    numberScans: "numberScans ",
    numberQrCode: " numberQrCode  ",
    numberQrDynamic: "numberQrDynamic   ",
    SalesReport: "Sales report (imports)",
    imports: "imports",
  },
};
