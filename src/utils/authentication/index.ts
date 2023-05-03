import { BaseRoles } from "./Roles";
import { axiosIns } from "@/libs/axios";
import jwt_decode from "jwt-decode";
import router from "../../router";
import { useAuthStore } from "@/stores/Auth";
import type { AccessToken } from "../../models/interfaces/Auth";
import type { AxiosError, AxiosResponse } from "axios";
import { storeToRefs } from "pinia";
import type { Composer } from 'vue-i18n';
import type { UserData } from '@/api/dto/auth';

export function IsAdmin() {
  return (
    GetUserRoles()?.includes(BaseRoles.SuperAdmin) ||
    GetUserRoles()?.includes(BaseRoles.Admin)
  );
}

export function GetAccessToken() {
  return localStorage.getItem("AccessToken");
}

export function GetRefreshToken() {
  return localStorage.getItem("RefreshToken");
}

export function IsLoggedIn() {
  return !!GetAccessToken();
}
export function LogOut() {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("RefreshToken");
  localStorage.removeItem("UserData");
  router.push("/login");
}

export function GetUserData() {
  const userData = localStorage.getItem("UserData");



  if (userData) {
 

    return JSON.parse(userData);
  } else return null;
}
export function ActionsGaurd(name: string, action: string) {
  if (name === "Public") return true;
  return (
    GetUserRoles()?.includes(`${name}-${action}`) ||
    GetUserRoles()?.includes(BaseRoles.SuperAdmin)
  );
}
export function GetAccessTokenDecoded(): AccessToken | null {
  if (GetAccessToken()) {


    return jwt_decode(GetAccessToken() as string);
  }
  else return null;
}
export async function RefreshToken() {
  try {
    const response = await axiosIns.post("Dashboard/DashUser/LogIn", null, {
      params: {
        id: GetUserData()?.id,
        refreshToken: GetRefreshToken(),
      },
    });
    const accessToken = response.data;
    if (!accessToken) {
      LogOut();
    }
    localStorage.setItem("AccessToken", accessToken);

    return accessToken;
  } catch (error) {
    LogOut();
  }
}
export function Authenticate({ id, name, accessToken, refreshToken }: UserData) {
  const userData = {
    id,
    name,
    accessToken,
    refreshToken,
  };
  localStorage.setItem("AccessToken", userData.accessToken);
  localStorage.setItem("RefreshToken", userData.refreshToken);
  localStorage.setItem("UserData", JSON.stringify(userData));

  if (IsAdmin()) {

    router.push("/");
    // router.push(GetHomePageRoute());
  } else {
    router.push("/");
  }
}
export function GetHomePageRoute() {
  return "/";
}
export function getHomePageForCurrentUser() {
  if (!IsAdmin()) {
    return "/";
  } else return "/home";
}

export function GetUserRoles() {


  return GetAccessTokenDecoded()?.[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
}

export function HandleLoginResponse(response: AxiosResponse) {
  if (response.status === 200) {
    Authenticate(response.data);

    return {
      message: "تم تسجيل الدخول بنجاح",
      email: GetUserData().email,
    };
  }
  return response.data;
}
export function HandleLoginError(error: AxiosError) {
  // const authStore = useAuthStore();
  // const { loginMsg }: any = storeToRefs(authStore);
  if (error.response)
    if (error.response.status == 404 || error.response.status == 403) {
      return {
        code: error.response?.status,
        message: 'المستخدم غير موجود .. يرجى التحقق من صحة المعلومات',
      }
    }
    else if (error.response.status == 400)
      return {
        code: error.response?.status,
        message: 'كلمة المرور خاطئة .. يرجى التأكد من حالة الأحرف '
      }
    else if (error.response.status == 500)
      return {
        code: error.response?.status,
        message: 'حدث خطأ في الخادم .. يرجى اعادة المحاولة'
      }
}
