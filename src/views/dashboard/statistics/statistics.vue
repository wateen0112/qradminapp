<template>
  <div>
    <Datepicker
      v-model="date"
      class="mt-10 md:w-[400px] w-max-[400px]"
      placeholder="date scans"
      range
    ></Datepicker>

    <div class="flex justify-center items-center">
      <div
        class="bg-white rounded flex justify-center flex-col w-[800px] items-center mt-5 overflow-auto"
      >
        <h2 class="my-5">اوقات ال scans الكلية</h2>
        <chartBar
          width="800"
          height="350"
          :color="['#FFD255']"
          :data="staticDto?.charts.map((ele) => ele.scansCount)"
          :categories="staticDto?.charts.map((ele) => ele.date)"
          :name="'scans count'"
        ></chartBar>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div
        class="bg-white rounded mt-10 flex justify-evenly items-center flex-wrap w-[800px] p-10"
      >
        <div>
          <chartDount
            width="400"
            height="350"
            :color="['#FF9F43', '#16a34a', '#0284c7', '#7c3aed', '#dc2626']"
            :data="staticDto?.countries.map((ele) => ele.rate)"
          ></chartDount>
        </div>
        <div>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">بلدان</th>
                <th class="text-left">معدل</th>
                <th class="text-left">عدد ال scans</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in staticDto?.countries" :key="i">
                <td>{{ item.name }}</td>
                <td>{{ item.rate }}</td>
                <td>{{ item.scansCount }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center flex-wrap gap-10 mt-10">
      <div class="bg-white rounded w-[380px]">
        <div class="flex justify-between items-center">
          <h2 class="m-5 mb-2 font-bold">التفاصيل</h2>
          <h2 class="m-5 mb-2 font-bold">اعلى متصفح</h2>
        </div>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">متصفح</th>
              <th class="text-left">عدد ال scans</th>
              <th class="text-left">معدل</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in staticDto?.browsers" :key="i">
              <td>{{ item.name }}</td>
              <td>{{ item.rate }}</td>
              <td>{{ item.scansCount }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="bg-white rounded w-[380px]">
        <div class="flex justify-between items-center">
          <h2 class="m-5 mb-2 font-bold">التفاصيل</h2>

          <h2 class="m-5 mb-2 font-bold">اعلى مدن</h2>
        </div>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">مدن</th>
              <th class="text-left">معدل</th>

              <th class="text-left">عدد ال scans</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in staticDto?.cities" :key="i">
              <td>{{ item.name }}</td>
              <td>{{ item.rate }}</td>
              <td>{{ item.scansCount }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import chartDount from "@/components/elkood/ChartDount.vue";
import chartBar from "@/components/elkood/ChartBar.vue";
import { useStatisticStore } from "@/stores/statistics";
import { storeToRefs } from "pinia";
const store = useStatisticStore();
const { endDate, startDate, staticDto, date } = storeToRefs(
  useStatisticStore()
);

store.GetStatistic(startDate.value, endDate.value);

watch(date, (val) => {
  if (val) {
    startDate.value = new Date(val[0]).toLocaleDateString();
    endDate.value = new Date(val[1]).toLocaleDateString();
    store.GetStatistic(startDate.value, endDate.value);
  }
});
</script>
