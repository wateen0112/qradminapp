import { defineStore } from "pinia";
import { StatisticsController } from "@/api/endpoints/statistics";
import type { Statistics } from "@/api/dto/statistics";
import { ref, watch } from 'vue';
import { useApi } from "@/composables/useApi";
const api = useApi();

export const useStatisticStore = defineStore("statistic", () => {
    const staticDto = ref<Statistics>();
    const startDate = ref("")
    const date = ref("")
    const endDate = ref("")
    //Actions
    async function GetStatistic(startDate: string, endDate: string) {
        const response = await api.GET<Statistics>(StatisticsController.GET_STATISTICS + `${startDate ? `?startDate=${startDate}` : ''}` + `${endDate ? `&endDate=${endDate}` : ''}`);
        staticDto.value = response.data;
        console.log(staticDto.value);

    }


    return {
        GetStatistic,
        staticDto,
        date,
        endDate,
        startDate

    };
});
