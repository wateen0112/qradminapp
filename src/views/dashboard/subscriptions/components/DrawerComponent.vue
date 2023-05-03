<template>
  <div
    id="drawer"
    :style="drawer ? 'left:0px' : 'left:-300px'"
    class="w-[300px]  max-h-[90vh] h-auto fixed top-16   overflow-x-hidden z-50 bg-white left-0 shadow-xl border-t-2"
  >
   <div>
    <div
    class="pt-3 px-3 flex justify-between items-center min-h-[40px] bg-[#ffd25558]"
  >
    <h1 class="mb-2 font-semibold">{{$t('subsecriptionTypes.details')}} </h1>
    <v-icon @click="drawer = !drawer">mdi-close</v-icon>
  </div>
  <div class="flex justify-end px-5 pt-3 text-sm">
    <div class="flex justify-center mx-5 items-center">
      <select class="">
        <option selected>English <v-checkbox></v-checkbox></option>
        <option>Arabic</option>
        <option>English</option>
      </select>
      <v-icon class="pt-3 text-black">mdi-menu-down </v-icon>
    </div>
    <h3>{{$t('qrTypes.language')}} </h3>
  </div>
  <div class="p-3 px-2 text-gray-400 text-sm">
    <label for="qrName">{{$t('subsecriptionTypes.name')}} </label>
    <v-text-field
      class="mt-3"
      color="primary"
      v-model="dto.name"
      id="qrName"
    ></v-text-field>
  </div>

  <div class="p-3 px-2 text-gray-400 text-sm">
    <label for="qrName">{{$t('subsecriptionTypes.price')}} </label>
    <v-text-field
      class="mt-3"
      color="primary"
      v-model="dto.price"
      id="qrName"
    ></v-text-field>
  </div>
  <div class="p-3 px-2 text-gray-400 text-sm">
    <label for="qrName">{{$t('subsecriptionTypes.qrLimit')}} </label>
    <v-text-field
      class="mt-3"
      color="primary"
      v-model="dto.qrLimit"
      id="qrName"
    ></v-text-field>
  </div>
  <div class="p-3 px-2 text-gray-400 text-sm">
    <label for="qrName">{{$t('subsecriptionTypes.tax')}} </label>
    <v-text-field
      class="mt-3"
      color="primary"
      v-model="dto.tax"
      id="qrName"
    ></v-text-field>
  </div>

  <div class="p-3 text-gray-400 text-sm"></div>
  <div class="p-3 px-2 text-gray-400 text-sm">
    <label for="qrName">{{$t('subsecriptionTypes.isActive')}}</label>
    <div class="justify-center">
      <input
        type="radio"
        @click="dto.isActive = false"
        :checked="dto.isActive"
        name="status"
        value="true"
      
        id="active"
        class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md"
      />
      <label for="active">{{$t('qrTypes.notActive')}}</label>
    </div>
    <div class="justify-center">
      <input
      @click="dto.isActive = false"
      :checked="!dto.isActive"
        type="radio"
        name="status"
   
        id="active"
        class="border-2 border-solid p-2 w-[100%] mt-2 rounded-md"
      />
     
    </div>
    <div class="p-3 px-2 text-gray-400 text-sm">
      <label for="count">      {{$t('subsecriptionTypes.description')}}</label>
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
    class="relative pb-4 w-[100%] flex justify-evenly  "
  >
    <button
      class="min-w-[120px] bg-[#263238d3] rounded-md border-[1px] border-solid py-2 flex justify-center items-center border-[#263238d3] text-white hover:opacity-70"
      @click="modify"
    >
    {{$t('qrTypes.edit')}}
    </button>
    <button
      @click="drawer = false"
      class="min-w-[120px] bg-white rounded-md border-1 py-2 border-[1px] border-solid border-[#263238d3] text-[#263238d3] hover:text-white hover:bg-[#263238d3]"
    >
      {{$t('qrTypes.revoke')}}
    </button>
  </div>
</div>
   </div>
</template>
<script lang="ts" setup>
import DataTable from "./components/DataTable.vue";
import DrawerComponent from "./components/DrawerComponent.vue";
import  {useSubStore} from  '@/stores/subsecription'
import { useDrawerStore } from "@/stores/drawer";
import { storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";
import {i18n} from  '@/i18n';
const drawerStore = useDrawerStore();
const { drawer } = storeToRefs(drawerStore);
const store = useSubStore();
store.getAllSubscription();
const { subsecription } = storeToRefs(store);

const selectSingalList = ref<Array<string>>([]);

//selectList to store All list ids
const selectList = ref<Array<string>>([]);

const selectedAll = ref(false);
const selectAll = function () {
  selectedAll.value = !selectedAll.value;
  

}

const dto = computed(() => {
  return {
    id: subsecription.value?.id ??'',
  name: subsecription.value?.name ??'',

  price:  parseInt((subsecription.value?.price ?? 0) + ""),
order : parseInt((subsecription.value?.order ?? 0) + ""),
  isActive: subsecription.value?.isActive ?? false,

  qrLimit:  parseInt((subsecription.value?.qrLimit ?? 0) + ""),
  description:  subsecription.value?.description ??'',
  tax: subsecription.value?.tax ??'',
  };
});
const modify = () => {
  store.getAllSubscription();
  console.log("object to be modified  : ", dto.value);
  store.modify(dto.value);

  drawer.value = !drawer.value;
};

const toggleSideBar = (id: any) => {
  drawer.value = !drawer.value;

};
</script>
<style scoped>
.v-text-field .v-field--no-label input,
.v-text-field .v-field--active input {
  display: none !important;
  background-color: red !important;
}
</style>
