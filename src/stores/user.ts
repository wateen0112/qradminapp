import { defineStore } from "pinia";
import { useApi } from '@/composables/useApi';
const { GET, POST, DELETE } = useApi();
import { UsersController } from "../api/endpoints/User";
// import type { Customer, CustomerDetails } from '../api/dto/customers';
// import { ref, reactive } from 'vue';
import { useCustomerStore } from "@/stores/customers"
export const useUserStore = defineStore("user", () => {

    const customerStore = useCustomerStore()
    async function blocked(id: any) {
        await POST(UsersController.BLOCK + id, null, { success: 'تم الحظر بنجاح' });
        isBlocked(true);
    }

    async function unBlocked(id: any) {
        await POST(UsersController.UNBLOCK + id, null, { success: 'تم الغاء الحظر بنجاح' });
        isBlocked(false);
    }

    function isBlocked(payload: any) {
        customerStore.customerDetailsDto.isBlocked = payload;
    }
    return { blocked, unBlocked }

})