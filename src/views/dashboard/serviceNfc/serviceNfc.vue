<template>
  <Page>
    <template #actions>
      <div class="flex items-center gap-6">
        <v-select
          id="select"
          :value="i18n.global"
          :items="items"
          v-model="$i18n.locale"
          class="tw-w-16"
          item-value="value"
          menu-icon="mdi-web"
          item-title="name"
        ></v-select>
        <label>:{{ $t("nfcService.InputLanguage") }}</label>
      </div>
    </template>
    <VCard class="p-6">
      <div class="flex justify-start items-start flex-col">
        <span> {{ $t("nfcService.identification_NFC") }}</span>
        <textarea
          :placeholder="$t('nfcService.identification_NFC')"
          class="mt-5"
          v-model="nfcTypes.brief"
          :label="$t('nfcService.identification_NFC')"
          cols="100%"
          rows="6"
        ></textarea>
      </div>
      <div class="flex justify-start items-start flex-col mt-4">
        <span> {{ $t("nfcService.HowToUse") }}</span>
        <textarea
          :placeholder="$t('nfcService.HowToUse')"
          v-model="nfcTypes.howToUseIt"
          cols="100%"
          rows="6"
          class="mt-5"
          :label="$t('nfcService.HowToUse')"
        ></textarea>
      </div>
      <v-card-action class="flex justify-center items-center w-full mt-8 gap-5">
        <div class="flex justify-center p-1 mt-3">
          <v-btn color="blue-grey" class="px-14" @click="Modify">
            {{ $t("nfcService.Edit") }}
          </v-btn>
          <v-btn
            variant="outlined"
            color="primary"
            class="px-12 mr-2"
            @click="router.go(-1)"
          >
            {{ $t("nfcService.GoBack") }}</v-btn
          >
        </div>
      </v-card-action>
    </VCard>
    <!-- <div class="card">
      <div>
        <span> {{ $t("nfcService.identification_NFC") }}</span>
      </div>
      <div class="mb-9">
        <v-textarea
          v-model="nfcTypes.brief"
          cols="10"
          rows="5"
          :label="$t('nfcService.identification_NFC')"
          variant="filled"
        ></v-textarea>
      </div>

      <div>
        <div>
          <span> {{ $t("nfcService.HowToUse") }}</span>
        </div>

        <v-textarea
          v-model="nfcTypes.howToUseIt"
          cols="10"
          rows="5"
          variant="filled"
          :label="$t('nfcService.HowToUse')"
        ></v-textarea>
      </div>

      <v-card-action class="btn">
        <button
          class="min-w-[120px] bg-[#263238d3] rounded-md border-[1px] border-solid py-2 ml-4 flex justify-center items-center border-[#263238d3] text-white hover:opacity-70"
          @click="Modify"
        >
          {{ $t("nfcService.Edit") }}
        </button>
        <button
          class="min-w-[120px] bg-white rounded-md border-1 py-2 border-[1px] border-solid border-[#EA5455] text-[#EA5455] hover:text-white hover:bg-[#EA5455]"
        >
          {{ $t("nfcService.GoBack") }}
        </button>
      </v-card-action>
    </div> -->
  </Page>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, watch, computed, onBeforeMount } from "vue";
import Page from "@/components/global/Page.vue";
import { i18n } from "@/i18n/index";
import { NfcServiceStore } from "@/stores/serviceNfc";
import type { DashNfc } from "@/models/dto/DashNfs";
import { storeToRefs } from "pinia";
const store = NfcServiceStore();
const { lang } = storeToRefs(store);
const router = useRouter();
const NfcDto = computed(() => store.NfcDto);
const nfcTypes = computed(() => store.nfcTypes);
store.getAll(lang.value);
const props = defineProps({
  id: String,
});
function Modify() {
  store.modify({ ...nfcTypes.value, id: props.id }, lang.value).then(() => {
    console.log("doneeeeeeee");
  });
}
const items = [
  { name: "العربية", value: "ar" },
  {
    name: "English",
    value: "en",
  },
  {
    name: "German",
    value: "de",
  },
];

onBeforeMount(() => {
  localStorage.getItem("lang") ?? "en";
});
function setLocale(el: any) {
  i18n.global.locale = el;
  store.getAll(lang.value).then(() => {
    localStorage.getItem(lang.value);
  });
  store.getAll(lang.value);
}
watch(lang, () => {
  console.log("locale", lang.value);
});
</script>
<style scoped>
/* .area { */
/* margin: 20px;
  margin-bottom: 82px;
}
.card {
  background-color: #fff;
  border-radius: 20px;
} */
/* .m-9 {
  font-size: 30px;

  border-radius: 20px;
  font-weight: 400;
  text-align: center;
  line-height: 35px;
  font-family: Inter;
} */
span {
  font-size: 20px;
  font-weight: 400;
  /* margin-left: 30px;
  margin-bottom: 30px; */
}
textarea {
  background-color: #f1f1f1;
  outline: none;
  border-radius: 5px;
  width: 100%;
}
textarea::placeholder {
  padding: 20px !important;
}
/* .btn {
  display: flex;
  align-items: flex-end;

  justify-content: center;
  padding: 15px;
  align-items: center;
}
v-btn {
  padding: 5px;
}
#select {
  width: 100px !important;
} */
</style>
