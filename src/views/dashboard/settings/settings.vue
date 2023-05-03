<template>
  <Page
    :search="false"
    :add="false"
    add="false"
    ref="page"
    :dialogTitle="$t('settings.addNewIndustry')"
    @save="addNewIndustry"
    :modalActions="true"
  >
    <template #dialog-form>
      <div class="p-10">
        <Form @submit.prevent="addIndustry">
          <v-form @submit.prevent="addIndustry">
            <v-text-field
              v-model="dto.name"
              :placeholder="$t('settings.name')"
              :label="$t('settings.name')"
            ></v-text-field>
          </v-form>
        </Form>
      </div>
    </template>

    <div v-if="loading !== status.error">
      <!-- class="flex lg:justify-start items-center lg:px-32 flex-row flex-wrap sm:justify-center sm:items-center sm:px-10" -->
      <VRow>
        <VCol cols="12" md="6" class="px-6">
          <div
            v-if="loading === status.loaded"
            class="flex justify-between items-center lg:flex-nowrap flex-wrap lg:flex-row"
          >
            <h1 class="w-32 font-semibold text-2xl">
              {{ $t("settings.industries") }}
            </h1>
            <div class="flex-1 inline-flex w-60">
              <v-text-field
                type="search"
                @keyup.stop="searchFunction"
                prepend-inner-icon="mdi-magnify"
                label="seach.. "
                class="mt-1"
              >
              </v-text-field>

              <v-btn
                @click="openModal"
                class="flex justify-center items-center"
                id="btn_btn"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>

          <!-- List well be here -->
          <Suspense>
            <template #default>
              <asyncLoadingComponet @edit="edit"></asyncLoadingComponet>
            </template>
            <template #fallback>
              <LoadingList></LoadingList>
            </template>
          </Suspense>
          <!--list well end here -->
        </VCol>

        <!-- Subsecriptions settings well be  here-->
        <VCol cols="12" md="6">
          <settings-component></settings-component>
        </VCol>
      </VRow>
      <Suspense>
        <template #default> </template>
        <template #fallback>
          <LoadingList></LoadingList>
        </template>
      </Suspense>
    </div>
    <ErrorComponent @refresh="onRefresh" v-else></ErrorComponent>
  </Page>
</template>
<script setup>
//imports . . .
import * as yup from "yup";
import { useSettingsStore } from "@/stores/settings.ts";
import Page from "@/components/global/Page.vue";
import LoadingList from "./components/LoadingList.vue";
import { useIndustryStore } from "@/stores/industry.ts";
import ErrorComponent from "./components/ErrorComponent.vue";
import IndustriesList from "./components/IndustriesList.vue";
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
const mainStore = useAppStore();

const industryStore = useIndustryStore();

const store = useSettingsStore(); //settings store ..jst for subsecriptions data
industryStore.getAllData();

// store.getSubsecriptionSettings();
const { subsecriptionSettings } = storeToRefs(store);
const { industries } = storeToRefs(industryStore);
const { loading } = storeToRefs(mainStore);
function handleSelected(e) {
  console.log("selected   : => ", e.target.value);
  console.log("data:", industries);
}
const asyncLoadingComponet = defineAsyncComponent({
  loader: () => import("./components/IndustriesList.vue"),
  loadingComponent: LoadingList,
  timeout: 3000,
});
const SettingsComponent = defineAsyncComponent({
  loader: () => import("./components/SubsecribtionSettings.vue"),
});
const action = ref(false);
const page = ref(null);

const schema = yup.object({
  name: yup.string().required("الاسم مطلوب").min(5),
});

const dto = reactive({
  name: "",
  id: "",
});

const openModal = () => {
  page.value.openDialog();
  console.log("my current data", dto.name, dto.id);
};
const addNewIndustry = () => {
  if (dto.name.length > 0 && dto.id.length == 0) {
    industryStore.addIndustry({ name: dto.name });
  } else if (dto.id != "") {
    industryStore.addIndustry({ id: dto.id, name: dto.name });
  } else {
    console.log("there is  a problem bro");
  }
  dto.name = "";
  dto.id = "";
  page.value.closeDialog();
};
const settingsDto = reactive({
  periodOfFreeModify: subsecriptionSettings.value?.periodOfFreeModify ?? "",
  periodOfPayModify: subsecriptionSettings.value?.periodOfPayModify ?? "",
  priceOfModify: subsecriptionSettings.value?.priceOfModify ?? "",
  taxOfModify: subsecriptionSettings.value?.taxOfModify ?? "",
});
//toggling modify event
const toggleModifyEvent = (id, name) => {
  dto.id = id;
  dto.name = name;
  console.log("my  data    ", id, name);
  openModal();
};
const modifySettings = () => {
  const myObject = {
    periodOfFreeModify: settingsDto.periodOfFreeModify,
    periodOfPayModify: settingsDto.periodOfPayModify,
    priceOfModify: settingsDto.priceOfModify,
    taxOfModify: settingsDto.taxOfModify,
  };
  store.modifySubscriptionsSettings(settingsDto);
};
//impelment  industry search feature   .. .

const tempArray = industries.value;
const searchFunction = (e) => {
  industries.value = tempArray;
  industries.value = industries.value.filter((item) => {
    return item.name.toLowerCase().includes(e.target.value.toLowerCase());
  });
  console.log("my constant array  =  >", e.target.value);
};
onBeforeMount(() => {
  industryStore.getAllData();
  store.getSubsecriptionSettings();
});
const pagPage = ref(1);
const edit = (id, name) => {
  page.value.openDialog();
  console.log("editing is on", name, id);
  dto.name = name;
  dto.id = id;
};
// refresh funciton  . . .
const onRefresh = () => {
  industryStore.getAllData();
  store.getSubsecriptionSettings();
};
</script>
<style scoped></style>
