import { sideBar } from "./sidebar";
import { qrTypes } from "./qrTypes";
import { settings } from "./settings";
import { nfcService } from "./nfcService";
import { subsecriptionTypes } from "./subsecriptionTypes";
import { customers } from "./customers";
import { forgetPassword } from "./forgetPassword";
import { contact } from "./contact"
import { commonQuestion } from "./commonQuestion"

export const de = {
  ...qrTypes,
  ...settings,
  ...subsecriptionTypes,
  ...nfcService,
  ...sideBar,
  ...customers,
  ...forgetPassword,
  ...contact,
  ...commonQuestion,
  login: {
    loginerror: "خطأ في المعلومات",
    invalidpassword: "كلمة المرور خاطئة .. يرجى التأكد من حالة الأحرف ",
    servererror: "حدث خطأ في الخادم .. يرجى اعادة المحاولة",
  },
  drivers: {
    drivers: "مستخدمو اللوحة ",
    search: "ابحث عن مستخدم",
    fullname: "الاسم و الكنية",
    email: "البريد الالكتروني",
    phonenumber: "رقم الجوال",
    datecreated: "تاريخ الإنشاء",
    status: "الحالة",
    details: "التفاصيل",
    newuser: "مستخدم جديد",
    newuserdialog: {
      adduser: "إضافة مستخدم جديد",
      name: "الاسم",
      email: "البريد الالكتروني",
      phonenumber: "رقم الموبايل",
      birthdate: "تاريخ الميلاد",
      rols: "الصلاحيات",
      password: "كلمة المرور",
      save: "حفظ",
      rollback: "تراجع",
    },
    login: {
      loginerror: "خطأ في المعلومات",
      invalidpassword: "كلمة المرور خاطئة .. يرجى التأكد من حالة الأحرف ",
      servererror: "حدث خطأ في الخادم .. يرجى اعادة المحاولة",
    },
    pageName: {
      commonQuestion: "الاسئلة الشائعة",
      customerAccountManagement: "ادارة حساب العملاء",
      subsecriptionManagement: "ادارة الاشتراكات",
      nfcService: "خدامات NFC",
      qrTypes: "انواع QR",
      ConnectWithUs: "تواصل معنا",
      DashboardUser: "مستخدمو اللوحة",
    },
    home: {
      numberUsers: "عدد المستخدمين",
      numberScans: "عدد Scans",
      numberQrCode: " عدد اكواد QR",
      numberQrDynamic: "عدد الاكواد الديناميكية ",
      SalesReport: "تقرير مبيعات (الواردات) ",
      imports: "الورادات",
    },
  },
};
