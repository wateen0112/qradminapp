
import { defineStore } from "pinia";
import { useApi } from '@/composables/useApi'
import { AccountController } from "@/api/endpoints/Account";
import { Authenticate, GetRefreshToken } from '../utils/authentication/index';
import { ref } from 'vue';
import router from "@/router";
export const useAuthStore = defineStore("auth", () => {
  const { GET, POST, DELETE } = useApi();
  //States  . . . 
  const email = ref('');
  // import { HandleLoginResponse, HandleLoginError } from "../utils/authentication";
  async function Login(payload: { email: string; password: string }) {


    const response = await POST(AccountController.Login, payload, {
      success: "تم تسجيل الدخول بنجاح",
      error: 'invalid data plz try again '
    });

    console.log(response.data);

    Authenticate(response.data)

  }


  async function refreshToken(payload: { refreshToken: string | null, id: string }) {
    const response = await POST(AccountController.RefreshToken, payload);
    console.log(response);
    console.log(response.data);
  }


  async function forgetPassword(payload: any) {
    try {
      const res = await POST(AccountController.FORGET_PASSWORD, payload, { error: "email is not found !" });
      if (res.status === 200) {
        email.value = payload.email;
        router.push({ path: '/ResetPassword' })
      }

    } catch (error) {
      throw (error);
    }
  }

  async function resetPassword(payload: any) {
    console.log('my data dto: ', payload);
    try {
      const res = await POST(AccountController.RESET_PASSWORD, payload, {
        success: 'passwrod reseted successfully ',
        error: 'Wrong code pls try  again  . . .. '
      })
      router.push({ path: '/login' })
      email.value = ''
    } catch (error) {
      throw (error);
    }
  }

  return { Login, refreshToken, forgetPassword, resetPassword, email };



});


