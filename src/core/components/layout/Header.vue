<template>
  <nav
    class="lg:tw-p-10 sm:tw-px-6 sm:tw-p-0 tw-flex lg:tw-justify-between tw-flex-wrap lg:tw-items-center lg:tw-flex-row sm:tw-items-center sm:tw-flex-col"
  >
    <div
      class="tw-inline-flex lg:tw-justify-center lg:tw-items-center sm:tw-w-[90%] lg:tw-w-auto sm:tw-justify-start sm:tw-mt-8"
    >
      <h1 class="tw-text-[1.3rem] sm:tw-text-[1.2rem]">{{ props.title }}</h1>
      <h2 class="mx-3"><img :src="props.imgSrc" alt="icon" /></h2>

      <span>{{ props.subtitle }}</span>
    </div>
   
    <div class="tw-flex sm:tw-justify-center sm:tw-items-center">
      <div class="lg:tw-block sm:tw-hidden tw-overflow-hidden" v-if="props.btn">
        <v-btn
          depressed
          color="primary"
          class="text-white tw-shadow-none elevation-0 lg:px-8 tw-mr-10"
        >
          {{ props.btnContent }}</v-btn
        >
      </div>
      <div class="lg:tw-hidden tw-flex" v-if="props.btn">
        <v-btn
          depressed
          color="primary"
          class="text-white tw-shadow-none elevation-0 sm:tw-px-0 lg:px-8 tw-mr-10 sm:tw-my-5"
        >
          <v-icon class="tw-pt-[8px] tw-pl-5 tw-text-white">{{
            props.btnIcon
          }}</v-icon>
        </v-btn>
      </div>
      <div
        class="tw-bg-[#FFFFFF] sm:tw-max-w-[100%] tw-px-2 tw-m-[10px] lg:tw-min-w-[373px] tw-max-h-[38px] tw-flex tw-justify-center tw-items-center tw-rounded-md"
      >
        <v-icon class="tw-pt-[8px] tw-pl-5 tw-text-gray-500"
          >mdi-magnify</v-icon
        >
        <input
          class="lg:tw-w-[100%] sm:tw-min-w-[220px] sm:tw-w-[100%] tw-px-2 tw-outline-none tw-py-3 sm:tw-text-[12px]"
          type="text"
          :placeholder="props.searchPlaceholder"
        />
      </div>
    </div>
  </nav>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps([
  "btn",
  "btnContent",
  "btnIcon",
  "title",
  "subtitle",
  "searchPlaceholder",
  "imgSrc",
]);
</script>
