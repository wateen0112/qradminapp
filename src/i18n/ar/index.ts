import { qrTypes } from "./qrTypes";
import { settings } from "./settings";
import { customers } from "./customers";
import { sideBar } from "./sidebar";
import { nfcService } from "./nfcService";
import { subsecriptionTypes } from "./subsecriptionTypes";
import { forgetPassword } from "./forgetPassword";
import { contact } from "./contact"
import { commonQuestion } from "./commonQuestion"

export const ar = {
  ...nfcService,
  ...settings,
  ...qrTypes,
  ...subsecriptionTypes,
  ...customers,
  ...sideBar,
  ...forgetPassword,
  ...contact,
  ...commonQuestion,

  breadcrumb: {
    main: "ادارة المحتوى",
    settings: "الاعدادات",
  },
  pageName: {
    commonQuestion: "الاسئلة الشائعة",
    customerAccountManagement: "ادارة حساب العملاء",
    subsecriptionManagement: "ادارة الاشتراكات",
    nfcService: "خدامات NFC",
    qrTypes: "انواع QR",
    ConnectWithUs: "تواصل معنا",
    DashboardUser: "مستخدمو اللوحة",
    settings: "الاعدادات",
    statistics: "الاحصائيات",
  },
  login: {
    login: "تسجيل الدخول",
    email: "البريد الالكتروني",
    password: "كلمة المرور",
    passwordError: "كلمة المرور مطلوبة",
    emailError: " البريد الالكتروني مطلوب",
    unSupportEmail: " البريد الالكتروني مطلوب",
    loginerror: "خطأ في المعلومات",
    invalidpassword: "كلمة المرور خاطئة .. يرجى التأكد من حالة الأحرف ",
    servererror: "حدث خطأ في الخادم .. يرجى اعادة المحاولة",
  },
  home: {
    numberUsers: "عدد المستخدمين",
    numberScans: "عدد Scans",
    numberQrCode: " عدد اكواد QR",
    numberQrDynamic: "عدد الاكواد الديناميكية ",
    SalesReport: "تقرير مبيعات (الواردات) ",
    imports: "الورادات",
  },
};
