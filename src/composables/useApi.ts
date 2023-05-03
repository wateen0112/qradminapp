import { axiosIns } from '@/libs/axios';
import { TYPE, useToast } from 'vue-toastification'
import Swal from 'sweetalert2';
import { useAppStore } from '@/stores/App';
import type { SweetAlertOptions } from 'sweetalert2'
import type { AxiosRequestConfig, AxiosError } from "axios"
import { serialize } from "object-to-formdata";
import { storeToRefs } from 'pinia';

type NotificationsType = { error?: string | boolean, comfirm?: SweetAlertOptions | boolean, success?: string | boolean }
type paramsType = { [param: string]: string }
const defaultSerializerOptions = { indices: true, dotsForObjectNotation: true, noFilesWithArrayNotation: true }
import { status } from '@/stores/App';

const defaultPostNotifications: NotificationsType = {
    comfirm: false,
    success: false,
    error: true
};

const defaultGetNotification: NotificationsType = {
    comfirm: false,
    success: false,
    error: true
};

const defaultDeleteNotification: NotificationsType = {
    comfirm: {
        text: 'سيتم حذف العنصر المحدد .. هل انت متأكد ؟ ',
        icon: 'warning',
        confirmButtonText: "نعم",
        denyButtonText: "تراجع"
    },
    error: true,
    success: "تم الحذف بنجاح",

}




export const useApi = () => {
    const appStore = useAppStore();
    const { loading } = storeToRefs(appStore);
    const toast = useToast()
    const handleErrorMessage = ({ response }: AxiosError | any, notifications: string | boolean) => {

        if (typeof (notifications) == 'boolean') {
            if (response && response.data && response.data.errors) {
                for (const key in response.data.errors) {
                    if (Object.prototype.hasOwnProperty.call(response.data.errors, key)) {
                        const errorType = response.data.errors[key];
                        if (typeof (errorType) == 'object' && Array.isArray(errorType)) {
                            errorType.forEach(msg => {
                                toast.error(msg)
                            })
                        }

                    }
                }
            }
            else if (response && response.data && response.data.message)
                toast.error(response.data.message)

            else if (response && response.data && response.data.title)
                toast.error(response.data.title)

            else if (response && response.data && response.message)
                toast.error(response.message)
            else if (response && response.statusText)
                toast.error(response.statusText)
            else toast.error('Server Error')


        }
        else
            if (typeof (notifications) == 'string') {
                toast.error(notifications)

            }

    }

    const GET = async <T>(url: string, params?: paramsType, notifications: NotificationsType = defaultGetNotification, config?: AxiosRequestConfig) => {
        // loading.value = status.waiting;
        try {

            const response = await axiosIns.get<T>(url, { params, ...config })
            loading.value = status.loaded;
            return { ...response, data: response.data as T }
        }

        catch (error) {
            loading.value = status.error;
            if (notifications.error)
                handleErrorMessage(error, notifications.error);

            throw (error)
        }

    };
    const POST = async (url: string, body: any = {}, notifications: NotificationsType = defaultPostNotifications, config: AxiosRequestConfig & { formData?: boolean } = {}) => {

        loading.value = status.waiting;

        try {
            loading.value = status.loaded;

            let response;
            if (config.formData) {
                response = await axiosIns.post(url, serialize(body, defaultSerializerOptions)
                    , { ...config })

            }
            else {
                response = await axiosIns.post(url, { ...body }, { ...config })
            }

            if (notifications.success && response.status == 200) {
                if (typeof (notifications.success) == 'string')
                    toast.success(notifications.success)
                else
                    toast.success('success')
            }


            return response
        }
        catch (error) {
            loading.value = status.error;
            if (notifications.error) {
                console.log("ERROR AREA");


                handleErrorMessage(error, notifications.error);
            }
            throw (error)
        }
    };
    const DELETE = async (url: string, body: any, params?: paramsType[], notifications: NotificationsType = defaultDeleteNotification, config?: AxiosRequestConfig) => {
        // loading.value = status.waiting;

        console.log('WTF');

        return new Promise((resolve, reject) => {
            console.log('Delete APi', notifications);
            if (notifications.comfirm && typeof notifications.comfirm == 'object') {
                console.log('Has Confirm');

                Swal.fire({
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    ...notifications.comfirm

                }).then((result) => {
                    if (result.isConfirmed) {
                        axiosIns.delete(url, { ...params, ...config, data: body }).then((res) => {

                            if (res.status == 200 && typeof (notifications.success) == 'string') {
                                toast.success(notifications.success);
                            }


                            resolve(res)


                        }).catch((er) => {
                            console.log('Error Catched');

                            if (typeof notifications.error === 'boolean' || typeof notifications.error === 'string')
                                handleErrorMessage(er, notifications.error)
                            reject(er)
                        })
                    }
                })
            }


            else {
                axiosIns.delete(url, { ...params, ...config }).then((res) => {

                    if (res.status == 200 && typeof (notifications.success) == 'string') {
                        toast.success(notifications.success)
                    }
                    resolve(res)
                    loading.value = status.loaded;


                }).catch((er) => {
                    if (typeof notifications.error === 'boolean' || typeof notifications.error === 'string')
                        handleErrorMessage(er, notifications.error)
                    loading.value = status.error;
                    reject(er)
                })
            }
        })
    };


    return {
        GET,
        POST,
        DELETE,
    }
}