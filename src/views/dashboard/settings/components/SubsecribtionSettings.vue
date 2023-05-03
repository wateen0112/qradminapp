<template>
  <div v-if="loading === status.loaded" class="px-4">
    <!-- class="flex-1 px-30 flex flex-col flex-nowrap lg:text-right lg:pt-[120px]" -->
    <Form
      :validation-schema="schema"
      ref="refForm"
      :initial-values="subsecriptionSettings"
    >
      <div class="flex justify-between items-center flex-nowrap flex-row">
        <h1
          class="mt-0 text-2xl font-semibold pb-[20px] text-center lg:w-auto w-full"
        >
          {{ $t("settings.manageSubsecriptions") }}
        </h1>
      </div>
      <v-card
        class="bg-white flex flex-col flex-nowrap justify-start items-center py-10 rounded-md"
      >
        <div class="flex flex-col justify-start min-w-[100%] px-10">
          <label for="">{{ $t("settings.freeEditingTime") }} </label>
          <Field v-slot="{ field }" name="periodOfFreeModify">
            <v-text-field
              v-model.number="subsecriptionSettings.periodOfFreeModify"
              v-bind="field"
              :prefix="$t('settings.day')"
              class="my-5 w-full"
            >
            </v-text-field>
          </Field>
          <ErrorMessage
            name="periodOfFreeModify"
            class="text-danger text-sm pt-1"
          >
          </ErrorMessage>
        </div>
        <div class="flex flex-col justify-start min-w-[100%] px-10">
          <label for=""> {{ $t("settings.codeEditingPrice") }} </label>
          <Field v-slot="{ field }" name="periodOfPayModify">
            <v-text-field
              v-model.number="subsecriptionSettings.periodOfPayModify"
              prefix="€"
              v-bind="field"
              class="my-5 w-full"
            >
            </v-text-field>
          </Field>
          <ErrorMessage
            name="periodOfPayModify"
            class="text-danger text-sm pt-1"
          >
          </ErrorMessage>
        </div>
        <div class="flex flex-col justify-start min-w-[100%] px-10">
          <label for=""> {{ $t("settings.codeEditingTaxPrice") }}</label>

          <Field v-slot="{ field }" name="taxOfModify">
            <v-text-field
              v-model.number="subsecriptionSettings.taxOfModify"
              prefix="%"
              v-bind="field"
              class="my-5 w-full"
            >
            </v-text-field
          ></Field>
          <ErrorMessage name="taxOfModify" class="text-danger text-sm pt-1">
          </ErrorMessage>
        </div>
        <div class="flex flex-col justify-start min-w-[100%] px-10">
          <label for=""> {{ $t("settings.availableTimeToPay") }}</label>

          <Field v-slot="{ field }" name="priceOfModify">
            <v-text-field
              v-model.number="subsecriptionSettings.priceOfModify"
              v-bind="field"
              :prefix="$t('settings.day')"
              class="my-5 w-full"
            >
            </v-text-field>
          </Field>
          <ErrorMessage name="priceOfModify" class="text-danger text-sm pt-1">
          </ErrorMessage>
        </div>
        <div
          @click="modifySettings"
          class="flex justify-center items-center w-[100%] mt-5"
        >
          <v-btn color="primary" class="px-14 min-h-auto"
            ><span class="text-white">{{ $t("settings.edit") }}</span></v-btn
          >
        </div>
      </v-card>
    </Form>
  </div>
  <div v-else><loading-settings></loading-settings></div>
</template>
<script setup>
//imports  . .
import * as yup from "yup";
import { useSettingsStore } from "@/stores/settings.ts";
import {
  ref,
  computed,
  reactive,
  onMounted,
  onBeforeMount,
  defineAsyncComponent,
} from "vue";
import { storeToRefs } from "pinia";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useAppStore } from "@/stores/App.ts";
import { status } from "@/stores/App.ts";
import { i18n } from "@/i18n";
import LoadingSettings from "./LoadingSettings.vue";
//stores  . . .
const mainStore = useAppStore();
const refForm = ref();
const store = useSettingsStore(); //settings store ..jst for subsecriptions data
// Refs And Variables . . .
const { loading } = storeToRefs(mainStore);
const { subsecriptionSettings } = storeToRefs(store);

// Methods And Functions  . . .
const settingsDto = reactive({
  periodOfFreeModify: subsecriptionSettings.value?.periodOfFreeModify ?? "",
  periodOfPayModify: subsecriptionSettings.value?.periodOfPayModify ?? "",
  priceOfModify: subsecriptionSettings.value?.priceOfModify ?? "",
  taxOfModify: subsecriptionSettings.value?.taxOfModify ?? "",
});
const modifySettings = () => {
  refForm.value?.validate().then((res) => {
    if (res.valid) {
      store.modifySubscriptionsSettings();
      console.log("valid");
    }
  });
};
const schema = computed(() => {
  return yup.object({
    periodOfFreeModify: yup.string().required("Question is required"),
    periodOfPayModify: yup.string().required("Question is required"),
    priceOfModify: yup.string().required("Question is required"),
    taxOfModify: yup.string().required("Question is required"),
  });
});
//gettings data on mouting screen . . .
onBeforeMount(() => store.getSubsecriptionSettings());
</script>
