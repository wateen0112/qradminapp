<template>
  <div>
    <apexchart
      type="donut"
      :height="height"
      :width="width"
      :options="{ ...dataDount.chartOptions, colors: color }"
      :series="data"
    ></apexchart>
  </div>
</template>
<script lang="ts" setup>
import { reactive, defineProps } from "vue";

const props = defineProps({
  height: {
    type: String,
    default: () => "350",
  },
  width: {
    type: String,
    default: () => "400",
  },
  color: {
    type: Array,
    default: () => ["#FF9F43"],
  },
  data: {
    type: Array,
    default: () => [],
  },
});
const dataDount = reactive({
  series: [44, 55, 41, 17, 15],
  chartOptions: {
    chart: {
      type: "donut",
    },
    colors: ["#FF9F43", "#16a34a", "#0284c7", "#7c3aed", "#dc2626"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
});
</script>
<style>
.apexcharts-toolbar {
  display: none !important ;
}
</style>
