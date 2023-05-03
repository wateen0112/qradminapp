<template>
  <Page
    :placeholder="$t('qrTypes.searchQuery')"
    @search="searchFunciton"
    :isLoading="true"
    :dialog-title="$t('qrTypes.edit')"
    :add="false"
    ref="page"
    :modal-actions="true"
    @save="modify"
    @close="resetDto()"
  >
    <template #dialog-form> 
     <Form
        ref="formRef"
        v-if="qrType"
        @submit="modify"
        :validation-schema="schema"
        v-slot="{ errors }"
        class="p-3 px-2 text-gray-400 text-sm mb-10"
      >
      <LangSwitcher v-model="store.lang" />

    
        <label for="qrName">{{ $t("qrTypes.name") }} </label>

        <Field
          v-model="qrType.name"
          name="qrName"
          type="text"
          v-slot="{ field }"
          class="form-control"
          :class="{ 'is-invalid': errors.qrName }"
        >
          <v-text-field
            class="mt-3"
            color="primary"
            v-model="qrType.name"
            v-bind="field"
          ></v-text-field>
        </Field>
        <ErrorMessage name="qrName" v-slot="{ message }">
          <span class="text-red-lighten-1">{{ message }}</span>
        </ErrorMessage>
        <div class="invalid-feedback">{{ errors.firstName }}</div>
        <div class="p-3 text-gray-400 text-sm"></div>
        <div class="p-3 px-2 text-gray-400 text-sm">
          <label for="qrName">{{ $t("qrTypes.status") }}</label>

          <div class="justify-center">
            <!-- <input
          type="radio"
         
          :value="true"
        v-model="qrType.isActive"

          id="active"
          class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md"
        />
        
        <label for="active">{{$t('qrTypes.active')}}</label>
      </div>
      <div class="justify-center">
        <input
          type="radio"
         
          :value="false"
        v-model="qrType.isActive"
          id="active"
          class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md"
        /> -->

            <!-- <label for="active">  {{$t('qrTypes.notActive')}}  </label> -->
            <v-radio-group inline v-model="qrType.isActive">
              <v-radio :label="$t('qrTypes.active')" :value="true"></v-radio>
              <v-radio
                :label="$t('qrTypes.notActive')"
                :value="false"
              ></v-radio>
            </v-radio-group>
          </div>
          <div class="p-3 px-2 text-gray-400 text-sm">
            <label for="count"> {{ $t("qrTypes.addDescription") }}</label>
            <textarea
              type="text"
              id="count"
              v-model="qrType.description"
              class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md resize-none"
              rows="5"
            ></textarea>
          </div>
        </div>
        <!-- <div
      id="btns-containter"
      class="absolute bottom-3 w-[100%] flex justify-evenly"
    >
      <button
        class="min-w-[130px] bg-[#263238d3] rounded-md border-[1px] border-solid py-2 flex justify-center items-center border-[#263238d3] text-white hover:opacity-70"
 @click="modify"
      >
      {{$t('qrTypes.edit')}}
      </button>
      <button
        @click="page.closeDialog"
        class="min-w-[130px] bg-white rounded-md border-1 py-2 border-[1px] border-solid border-[#263238d3] text-[#263238d3] hover:text-white hover:bg-[#263238d3]"
      >
        {{$t('qrTypes.revoke')}}
      </button>
    </div> -->
      </Form>
    </template>
    <Suspense>
      <template #default>
        <table-component @details="openDialog"></table-component>
      </template>
      <template #fallback>
        <loading-component></loading-component>
      </template>
    </Suspense>

    <div class="text-center">
      <template>
        <div class="text-center">
          <v-pagination
            :length="4"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </div>
      </template>
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { Form, Field, validate, ErrorMessage } from "vee-validate";
import DrawerComponent from "./components/DrawerComponent.vue";
import { useQrTypeStore } from "@/stores/QrType";
import { useDrawerStore } from "@/stores/drawer";
import * as Yup from "yup";
import { storeToRefs } from "pinia";
import { ref, computed, watch, defineAsyncComponent, onMounted } from "vue";
import Page from "@/components/global/Page.vue";
import { i18n } from "@/i18n/index";
import LangSwitcher from '@/components/elkood/LangSwitcher.vue';

const drawerStore = useDrawerStore();
const { drawer } = storeToRefs(drawerStore);

const store = useQrTypeStore();

const { qrTypes, tempArray, qrType, lang } = storeToRefs(store);

const selectSingalList = ref<Array<string>>([]);
const modify = () => {
  formRef.value.validate().then((v: any) => {
    if (v.valid) {
      store.modify().then(() => {
        page.value.closeDialog();
      });
    }
  });
};


//selectList to store All list ids
const selectList = ref<Array<string>>([]);

const selectedAll = ref(false);
const selectAll = function () {
  selectedAll.value = !selectedAll.value;
  qrTypes.value?.forEach((item) => {
    item.selected = selectedAll.value;
  });
};
const schema = Yup.object().shape({
  qrName: Yup.string().required("QR Name is required"),
});
const onSubmit = (values: any) => {
  // display form values on success
  alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
};
const loadingComponent = defineAsyncComponent(
  () => import("./components/DataTableLoading.vue")
);
const TableComponent = defineAsyncComponent({
  loader: () => import("./components/DataTable.vue"),

  loadingComponent: loadingComponent,
  timeout: 3000,
});

function selectAllSingal(ids: any) {
  selectList.value.push(ids);
}
const page = ref();
const openDialog = () => {
  page.value?.openDialog();
};
const itemsToDelete = ref();

const isMulti = ref();
const selected = ref([]);
// watch selectList to change checkbox
watch(selectList.value, () => {
  if (selectList.value.length > 0) {
    isMulti.value = true;
  } else {
    isMulti.value = false;
  }
});
function popSelectAll() {
  selectSingalList.value.splice(0, selectSingalList.value.length);
}
const deleteItems = function () {
  itemsToDelete.value = []; //to avoid server errors if it sent empt
  qrTypes.value?.forEach((item) => {
    if (item.selected) {
      itemsToDelete.value.push(item.id);
    }
  });

  store.deletQrType(selectList.value);
};

const formRef = ref();
const dto = computed(() => {
  return {
    id: qrType.value?.id,
    name: qrType.value?.name ?? "",

    isActive: qrType.value?.isActive ?? false,
    description: qrType.value?.description,
  };
});

const searchFunciton = (e: any) => {
  qrTypes.value = tempArray.value;

  qrTypes.value = qrTypes.value?.filter((item: any) => {
    return item.name.toLowerCase().includes(e.toLowerCase());
  });
};

// onMounted(()=>{
//   store.getAll();

// })

onMounted(() => {
  store.getAll();
});
const resetDto = () => {
  qrType.value = {
    id: "",
    count: 0,
    name: "",
    isActive: false,
    selected: false,
    description: "",
  };
};
</script>
<style scoped>
.v-icon {
  margin-top: -8px !important;
}
.v-btn--variant-text {
  background-color: red;
}
* {
  transition: 0.4s;
}
</style>
