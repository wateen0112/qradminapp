import { defineStore } from "pinia";
import { HomeController } from "@/api/endpoints/home";
import type { HomeDto } from "@/api/dto/home.dto";
import { ref } from "vue";
import { useApi } from "@/composables/useApi";
const api = useApi();
export const useHomeStore = defineStore("home", () => {
  const HomeList = ref<HomeDto[]>([]);
  const yearVal = ref(
    2022
  )
  //Actions
  async function GetHome(year: any) {
    const response = await api.GET<HomeDto[]>(HomeController.GetHome + year);
    HomeList.value = response.data;
    console.log(HomeList.value);

  }


  return {
    GetHome,
    HomeList,
    yearVal
  };
});
