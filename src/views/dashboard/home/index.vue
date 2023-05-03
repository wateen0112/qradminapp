<template>
  <div>
    <div class="grid grid-cols-12 mt-5">
      <div
        class="md:col-span-3 col-span-12 flex m-5 justify-center items-center gap-2 flex-col bg-white rounded h-[250px]"
      >
        <div class="flex justify-start items-start">
          <v-btn color="primary" icon="mdi-account" size="x-large"></v-btn>
          <div class="flex flex-col mx-6">
            <p class="text-2xl items-end">{{ homeDto.userCount }}</p>
            <h1>{{ $t("home.numberUsers") }}</h1>
          </div>
        </div>
        <chartArea
          width="200"
          height="110"
          :data="homeDto.userCountMonthly"
          :name="$t('home.numberUsers')"
        ></chartArea>
      </div>

      <div
        class="md:col-span-3 col-span-12 flex m-5 justify-center items-center gap-2 flex-col bg-white rounded h-[250px]"
      >
        <div class="flex justify-start items-start">
          <v-btn
            color="blue-grey"
            icon="mdi-credit-card-scan-outline"
            size="x-large"
          ></v-btn>
          <div class="block mx-6">
            <p class="text-2xl items-end">{{ homeDto.scaneCount }}</p>
            <h1>{{ $t("home.numberScans") }}</h1>
          </div>
        </div>
        <chartArea
          width="200"
          height="110"
          :data="homeDto.scaneCountMonthly"
          :name="$t('home.numberScans')"
        ></chartArea>
      </div>
      <div
        class="md:col-span-3 col-span-12 flex m-5 justify-center items-center gap-2 flex-col bg-white rounded h-[250px]"
      >
        <div class="flex justify-start items-start">
          <v-btn color="info" icon="mdi-qrcode-scan" size="x-large"></v-btn>
          <div class="block mx-6">
            <p class="text-2xl items-end">{{ homeDto.qrCount }}</p>
            <h1>{{ $t("home.numberQrCode") }}</h1>
          </div>
        </div>
        <chartArea
          width="200"
          height="110"
          :data="homeDto.qrCountMonthly"
          :name="$t('home.numberQrCode')"
        ></chartArea>
      </div>
      <div
        class="md:col-span-3 col-span-12 flex m-5 justify-center items-center gap-2 flex-col bg-white rounded h-[250px]"
      >
        <div class="flex justify-start items-start">
          <v-btn color="error" icon="mdi-qrcode" size="x-large"></v-btn>
          <div class="flex flex-col mx-6">
            <p class="text-2xl items-end">{{ homeDto.qrDynamicCount }}</p>
            <h1 class="text-lg">{{ $t("home.numberQrDynamic") }}</h1>
          </div>
        </div>
        <chartArea
          width="200"
          height="110"
          :data="homeDto.qrDynamicCountMonthly"
          :name="$t('home.numberQrDynamic')"
        ></chartArea>
      </div>
      <div
        class="md:col-span-8 col-span-11 p-5 m-5 bg-white rounded w-full overflow-auto"
      >
        <div>
          <div class="flex justify-between items-center">
            <h2 class="mb-4">{{ $t("home.SalesReport") }}</h2>

            <div>
              <v-select
                class="w-[100px]"
                label="year"
                v-model="yearVal"
                :value="yearVal"
                :items="['2023', '2022', '2021', '2020']"
                item-value="id"
                item-title="country"
                @change="changeVal"
              ></v-select>
            </div>
          </div>
          <chartBar
            width="800"
            height="350"
            :color="['#FFD255']"
            :data="homeDto.importsMonthly"
            :name="$t('home.imports')"
          ></chartBar>
        </div>
      </div>
    </div>

    <!-- <div class="flex justify-center items-center w-full mt-10">
      <div class="bg-white rounded p-5">
        <div>
          <div class="flex justify-between items-center">
            <h2 class="mb-4">تقرير مبيعات (الواردات)</h2>

            <div>
              <v-select
                class="w-[100px]"
                label="year"
                v-model="yearVal"
                :value="yearVal"
                :items="['2023', '2022', '2021', '2020']"
                item-value="id"
                item-title="country"
                @change="changeVal"
              ></v-select>
            </div>
          </div>
          <chartBar
            width="800"
            height="350"
            :color="['#FFD255']"
            :data="homeDto.importsMonthly"
            :name="'imports'"
          ></chartBar>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { useHomeStore } from "@/stores/Home";
import { computed } from "vue";
import chartBar from "@/components/elkood/ChartBar.vue";
import chartArea from "@/components/elkood/ChartArea.vue";
import { storeToRefs } from "pinia";
const homeDto = computed(() => store.HomeList);
const store = useHomeStore();
const { yearVal } = storeToRefs(store);

function changeVal() {
  store.GetHome(yearVal.value);
}
store.GetHome(yearVal.value);
</script>
