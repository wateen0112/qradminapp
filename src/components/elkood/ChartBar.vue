<template>
  <div>
    <apexchart
      type="bar"
      :height="height"
      :width="width"
      :options="{
        ...dataColumn.chartOptions,
        colors: color,
        xaxis: {
          categories:
            categories.length > 0
              ? categories
              : [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'July',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
        },
      }"
      :series="[{ ...dataColumn.series, data: data, name: name }]"
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
  categories: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: () => "",
  },
});
const dataColumn = reactive({
  series: [
    {
      name: "",
      data: [44, 55, 41, 67, 22, 43, 21, 49, 20],
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      height: 350,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + "%";
      },
    },
    colors: ["#FF9F43"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
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
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },
  },
});
</script>
<style>
.apexcharts-toolbar {
  display: none !important ;
}
</style>
