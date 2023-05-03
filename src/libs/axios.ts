import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { AppConfig } from '@/app.config';
import { GetAccessToken, GetUserData } from "@/utils/authentication/index"
import { useAuthStore } from "@/stores/Auth"
import { RefreshToken } from "@/utils/authentication"
// import {axiosIns} from "@/libs/axios"



const errorHandler = async (error: AxiosError) => {

  const config: AxiosRequestConfig | undefined = error?.config

  if (error.response?.status === 401) {
    const accessToken = await RefreshToken();
    if (config && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      return axios(config)
    }

  }

  return Promise.reject(error)
  // const config: AxiosRequestConfig | undefined = error?.config
  // if (error.response?.status === 401) {
  // const accessToken = await RefreshToken();
  // config.headers = {
  //     ...config.headers,
  //     Authorization: `Bearer ${accessToken}`
  // }

  // return axios(config)

  // }

  // return axios(config)

}


const requestHandler = (request: AxiosRequestConfig) => {

  if (request.headers)
    request.headers.Authorization = `Bearer ${GetAccessToken()}`;
  return request;
};


const responseHandler = (response: AxiosResponse) => {
  // console.log('The Damn Data is ', GetUserData().id);

  const auth = useAuthStore();
  if (GetUserData()) {
    if (response.status == 401) {

      auth.refreshToken({
        refreshToken: GetAccessToken(),
        id: GetUserData().id

      })
    }
  }

  return response;

};


export const axiosIns = axios.create({
  baseURL: `${AppConfig.DOMAIN_HOST}/api/`,
  headers: { lang: 'en' },

});

axiosIns.interceptors.request.use(requestHandler)
axiosIns.interceptors.response.use(responseHandler, errorHandler)




