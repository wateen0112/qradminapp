<template>
<div v-if="loading===status.waiting">
<LoadingList></LoadingList>
</div>

<div  v-if="loading===status.loaded" id="table-data " class="max-h-[470px] min-h-0" >
  <div class="flex flex-row flex-nowrap justify-between items-center bg-white p-5 my-2 rounded-md shadow-md">
  
  <h1 >   <v-icon class="text-red-500 cursor-pointer" @click="deleteItems"> mdi-delete</v-icon> </h1>
  <h1>{{$t('settings.name')}}</h1>
  <h1>{{$t('settings.addingDate')}} </h1>
  
  </div>
  <div
  
  v-for="(item, index) in industries.slice((pagPage-1)*4,pagPage*4)" :key="index"
  class="flex flex-row flex-nowrap justify-between items-center bg-white p-2 px-5   my-2  rounded-md shadow-md">
  
  <h1 >   <v-checkbox
  @click="handleSelected"
    color="primary"
  v-model="item.selected"
    hide-details
  
  ></v-checkbox></h1>
  <h1>{{item.name}}</h1>
  <h1>{{item.addedDate.split('T')[0]}}</h1>
  <h1>  <v-icon      @click="$emit('edit', item.id , item.name)" class="text-yellow-500 hover:opacity-75 cursor-pointer">mdi-pencil-outline</v-icon> </h1>
  </div>
  <div   
  
  v-if="industries.length==0"
  class="flex flex-row flex-nowrap justify-center items-center bg-white p-5 my-2 rounded-md shadow-md">
  
  <h1 class="text-center"> {{$t('settings.noData')}}</h1>
    </div>
  
  
    <div class="text-center">
      <v-pagination
        v-model="pagPage"
        :length="(industries.length/4)+(industries.length%4>0)"
        rounded="circle"
      ></v-pagination>
  
  
    </div>
  </div>
</template>
<script setup >
//imports . . .

import {useIndustryStore} from '@/stores/industry.ts';
import {storeToRefs } from 'pinia';
import {useAppStore,status} from '@/stores/App.ts';
import LoadingList from './LoadingList.vue'
import { ref , computed,reactive,onMounted,onBeforeMount} from  'vue';
//emits 
const editEvent = () => emit("edit");
//refs and variables . . . 

const store = useIndustryStore();
const {industries}= storeToRefs(store);
const mainStore =  useAppStore()
const {loading} = storeToRefs(mainStore)
const pagPage = ref(1); //pagination  page controller 
//Dots . . . 
const openModal = ()=>{
page.value.openDialog()
console.log(  'my current data',dto.name, dto.id);


}

const page = ref();
//async functions to get data  . . . 
store.getAllData();
//Methodes and mutaions . . . 
const deleteItems = ()=>{
  var items = [];
  industries.value.forEach(element => {
    if(element.selected===true){
      items.push(element.id);
    }

  });
 if(items.length!==0){
  store.deleteIndustry(items);
  page.value= 1;
 }

}
const toggleModifyEvent = (id , name)=>{
  openModal();
}
//test things . . . 

</script>
