<template>
  <div>
    <apexchart
      type="area"
      :height="height"
      :width="width"
      :options="dataArea.chartOptions"
      :series="[{ ...dataArea.series, data: data, name: name }]"
    ></apexchart>
  </div>
</template>
<script lang="ts" setup>
import { reactive, defineProps } from "vue";

const props = defineProps({
  height: {
    type: String,
    default: () => "150",
  },
  width: {
    type: String,
    default: () => "800",
  },
  color: {
    type: Array,
    default: () => ["#FF9F43"],
  },
  data: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: () => "",
  },
});
const dataArea = reactive({
  series: [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    // colors: ["#FF9F43"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
});
</script>
<style>
.apexcharts-toolbar {
  display: none !important ;
}
</style>
