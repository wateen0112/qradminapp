<template>
  <div
    id="drawer"
    :style="drawer ? 'left:0px' : 'left:-300px'"
    class="w-[300px] h-[90vh] fixed top-16 z-50 bg-white left-0 shadow-xl border-t-2"
  >
    <div
      class="pt-3 px-3 flex justify-between items-center min-h-[40px] bg-[#ffd25558]"
    >
      <h1 class="mb-2 font-semibold">{{$t('qrTypes.details')}} </h1>
      <v-icon @click="drawer = !drawer">mdi-close</v-icon>
    </div>
    <div class="flex justify-end px-5 pt-3 text-sm">
     
    
    </div>

    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="p-3 px-2 text-gray-400 text-sm">
  
      <label for="qrName">{{$t('qrTypes.name')}} </label>
    
      <Field name="qrName" type="text" class="form-control" :class="{ 'is-invalid': errors.qrName }" >
        <v-text-field
        class="mt-3"
        color="primary"
        v-model="dto.name"
        id="qrName"
      ></v-text-field>
      </Field>
      <div class="invalid-feedback">{{errors.firstName}}</div>
      <div class="p-3 text-gray-400 text-sm"></div>
      <div class="p-3 px-2 text-gray-400 text-sm">
        <label for="qrName">{{$t('qrTypes.status')}}</label>

        <div class="justify-center">
          <input
            type="radio"
            name="status"
            value="true"
            :checked="dto.isActive"
            @click="dto.isActive = true"
            id="active"
            class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md"
          />
          <label for="active">{{$t('qrTypes.active')}}</label>
        </div>
        <div class="justify-center">
          <input
            type="radio"
            name="status"
            @click="dto.isActive = false"
            :checked="!dto.isActive"
            id="active"
            class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md"
          />
          <label for="active">  {{$t('qrTypes.notActive')}}  </label>
        </div>
        <div class="p-3 px-2 text-gray-400 text-sm">
          <label for="count">      {{$t('qrTypes.addDescription')}}</label>
          <textarea
            type="text"
            id="count"
            v-model="dto.description"
            class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md resize-none"
            rows="5"
          ></textarea>
        </div>
      </div>
      <div
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
          @click="drawer = false"
          class="min-w-[130px] bg-white rounded-md border-1 py-2 border-[1px] border-solid border-[#263238d3] text-[#263238d3] hover:text-white hover:bg-[#263238d3]"
        >
          {{$t('qrTypes.revoke')}}
        </button>
      </div>
    </Form>

  
  </div>
</template>
<script lang="ts" setup>
import DataTable from "./components/DataTable.vue";
import DrawerComponent from "./components/DrawerComponent.vue";
import { useQrTypeStore } from "@/stores/QrType";
import { Form, Field, validate } from 'vee-validate';
import * as Yup from 'yup';

import { useDrawerStore } from "@/stores/drawer";
import { storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";
import {i18n} from  '@/i18n';
const drawerStore = useDrawerStore();
const { drawer } = storeToRefs(drawerStore);
const store = useQrTypeStore();
const { qrTypes,lang } = storeToRefs(store);
const tempArray = qrTypes.value;
const selectSingalList = ref<Array<string>>([]);
const query = ref("");
//selectList to store All list ids
const selectList = ref<Array<string>>([]);
store.getAll(lang.value
);
const selectedAll = ref(false);
const selectAll = function () {
  selectedAll.value = !selectedAll.value;
  qrTypes.value?.forEach((item) => {
    item.selected = selectedAll.value;
  });
};

const { qrType } = storeToRefs(store);




const dto = computed(() => {
  return {
    id: qrType.value?.id,
    name: qrType.value?.name ?? "",
    count: parseInt((qrType.value?.count ?? 0) + ""),
    isActive: qrType.value?.isActive ?? false,
    description: qrType.value?.description,
  };
});
const schema = Yup.object().shape({
           
            qrName: Yup.string()
                .required('QR Name is required'),
               
        });

const modify = () => {

if (dto.value.name!=='')
{
  console.log("object to be modified  : ", dto.value);
  store.modify(dto.value , lang.value);
  store.getAll(lang.value)
  drawer.value = !drawer.value;

}
else {
  alert('Qr name is required !!!')
}
};
const onSubmit= (values:any)=> {
            // display form values on success
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        }
const toggleSideBar = (id: any) => {
  drawer.value = !drawer.value;
  store.getById(id);
};
</script>
<style scoped>
.v-text-field .v-field--no-label input,
.v-text-field .v-field--active input {
  display: none !important;
  background-color: red !important;
}
</style>
