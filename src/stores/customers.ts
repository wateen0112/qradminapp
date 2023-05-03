
import { defineStore } from "pinia";
import { useApi } from '@/composables/useApi';
import { useRouter } from "vue-router";
import { CustomerController } from "../api/endpoints/Customer";
import { QrController } from "../api/endpoints/Qr";
import { SubsecibersController } from "../api/endpoints/subsecriptions";
import type { Customer, CustomerDetails, Country } from '../api/dto/customers';
import { ref, computed } from 'vue';
const { GET, POST, DELETE } = useApi();
const router: any = useRouter();
interface Pagination {
    pageSize: number,
    pageIndex: number,
}
export const useCustomerStore = defineStore("customer", () => {

    const customers = ref<any[]>([]);
    const countries = ref<Country[]>([]);
    const versionsQr = ref<any[]>([]);
    const filterVal = ref("");
    const customerDetailsDto = ref<CustomerDetails>({
        id: '',
        name: "",
        email: "",
        phoneNumber: "",
        street: "",
        website: "",
        company: "",
        cityId: "",
        countryId: "",
        newPassword: "",
        industryId: "",
        isBlocked: false,
        qrs: [],
        subscriptions: [],
        qrsModified: [
         ],
    });
    const customerDto = ref<Customer>({
        name: "",
        email: "",
        countryId: null,
        cityId: null,
        website: "",
        phoneNumber: "",
        password: "",
        street: "",
        industryId: null,
        company: "",
    })
    const pagination = ref({
        pageSize: 10,
        pageIndex: 1,
    });


    async function GetAllCustomer() {
        const response: any = await GET(CustomerController.GetCustomers);
        customers.value = response.data
    }

    async function GetAllCountry() {
        const response: any = await GET<Country[]>('Dashboard/Setting/GetAllCountries');
        countries.value = response.data
        console.log('test1', countries)
    }

    async function GetDetailsCustomer(id: any) {
        const response = await GET<CustomerDetails>(CustomerController.GetDetailsCustomer + id);
        customerDetailsDto.value =response.data
 customerDetailsDto.value.countryId =response.data.countryId;
 customerDetailsDto.value.cityId=response.data.cityId
 customerDetailsDto.value.industryId=response.data.industryId
        
        customerDetailsDto.value.newPassword=''
    }

    async function addCustomer(payload: Customer) {
        const response = await POST(CustomerController.AddCustomer, payload, { success: 'تم الاضافة بنجاح' });
        customers.value.unshift(response.data)

    }

    async function updateCustomer(payload: any) {

        console.log('my damn payload:',payload);
        
        const response = await POST(CustomerController.UpdateCustomer, {...payload}, { success: 'تم التعديل بنجاح' });
        customerDetailsDto.value = { ...response.data };
        // router.push('/main/customersAccount')
    }

    async function deleteCustomer(ids: string[]) {
        await DELETE(CustomerController.DeleteCustomer, ids);

        customers.value = customers.value?.filter((item: any) => !ids.includes(item.id))
    }

    // action tables
    async function deleteQr(payload: { id: string; qrIndex: string }) {
        await DELETE(QrController.DELETE_QR, payload)
        customerDetailsDto.value.qrs = customerDetailsDto.value.qrs.filter((ele: any) => ele.id != payload.id)
    }

    async function activateSubscription(id: string) {
        await POST(SubsecibersController.ACTIVATE + id, null, { success: 'تم التفعيل بنجاح' })
    }
    async function getVersionQr(id: string, qrIndex: string) {
        const response: any = await GET(QrController.GET_VERSION + `?id=${id}` + `&qrIndex=${qrIndex}`);
        versionsQr.value = response.data

    }
    async function selectActivateVersion(payload: { id: string, qrIndex: string }, selectedVal: boolean) {
        await POST(QrController.SELECT_ACTIVATION, {
            id: payload.id,
            qrIndex: payload.qrIndex
        }, selectedVal ? { success: 'تم التفعيل' } :
            { success: 'تم الغاء التفعيل' }
        );


    }


    function findCustomer(payload: string) {
        filterVal.value = payload;
    }

    function paginationCustomer(payload: Pagination) {
        pagination.value = {
            pageSize: payload.pageSize,
            pageIndex: payload.pageIndex,
        }
    }

    const paginateListCustomer = computed(() => {
        return filterListCustomer.value.slice(
            (pagination.value.pageIndex - 1) * pagination.value.pageSize,
            pagination.value.pageSize * pagination.value.pageIndex
        );
    })

    const filterListCustomer = computed(() => {
        return customers.value.filter((ele: { email: string, name: string, phoneNumber: string }) =>
            ele.name.toLowerCase().includes(filterVal.value.toLowerCase()) ||
            ele.email.toLowerCase().includes(filterVal.value.toLowerCase()) ||
            !customers.value
        )
        // ele.phoneNumber.toLowerCase().includes(filterVal.value.toLowerCase()) ||
    })

    return {
        GetAllCustomer,
        findCustomer,
        paginationCustomer,
        customers,
        countries,
        getVersionQr,
        selectActivateVersion,
        pagination,
        filterListCustomer,
        paginateListCustomer,
        activateSubscription,
        GetAllCountry,
        customerDetailsDto,
        deleteCustomer,
        updateCustomer,
        GetDetailsCustomer,
        customerDto,
        addCustomer,
        versionsQr,
        deleteQr
    };
});