<template>
<Page 

ref="page"
:placeholder="$t('subsecriptionTypes.search')"  :buttonText="$t('subsecriptionTypes.new')"


:dialogTitle="subsecription.id!==''?$t('subsecriptionTypes.modify'):$t('subsecriptionTypes.new')" :modal-actions="false" @search="searchFunction">
<template #dialog-form>
  <div class="min-h-[300px] p-10 pt-0" v-if="subsecription">
 <v-text-field  
 class="my-8"
 v-model="subsecription.name"
 placeholder="name"
 label="name"
 >


</v-text-field>
 <v-text-field 
 class="my-8"
 v-model="subsecription.description"
 placeholder="description"
 label="description"
 >
</v-text-field>
<v-text-field 
class="my-8"
v-model="subsecription.qrLimit"
placeholder="qrLimit"
label="qrLimit"
>
</v-text-field>
<v-text-field 
class="my-8"
v-model="subsecription.price"
placeholder="price"
label="price"
>
</v-text-field>
<v-text-field 
class="my-8"
v-model="subsecription.tax"
placeholder="tax"
label="tax"
>
</v-text-field>
  </div>
  <div class="p-5 pt-0 relative">
    <v-btn variant="flat" @click="saveEvent">
      <!-- <SmallLoading v-if="isLoading" class="absolute top-3"></SmallLoading> -->
      <span>{{ $t("customers.save") }}</span>
    </v-btn>
    <v-btn variant="tonal" class="mx-4" @click="page.closeDialog()">
      {{ $t("customers.back") }}
    </v-btn>
  </div>
</template>
<div>
  <Suspense>
   <template #default>
<table-component  @details="openDialog()"></table-component>
   </template>
   <template #fallback>
    <data-table-loading></data-table-loading>
       </template>
  </Suspense>
</div>
</Page>


  </template>

  <script lang="ts" setup>
  //imports
import { defineAsyncComponent } from 'vue';
import { useSubStore } from '@/stores/subsecription';
import { reactive } from '@vue/reactivity';
import {ref,onBeforeMount} from  'vue';
import {useAppStore} from '@/stores/App'
import DataTableLoading from './components/DataTableLoading.vue';
import DataTable from './components/DataTable.vue';
  import Page from '@/components/global/Page.vue'
import { storeToRefs } from 'pinia';
import { SubsecriptionType } from '@/models/dto/Subsecription';

//define async cmoponents
const TableComponent = defineAsyncComponent({
  loader:()=>import('./components/DataTable.vue'),

  loadingComponent:()=>import('./components/DataTableLoading.vue'),
  timeout: 3000
}
)

//refs and variabels
const page = ref();

const store = useSubStore();

const mainStore = useAppStore();
const {subsecriptions , tempArray,subsecription}  = storeToRefs(store);
const dto = reactive( {
 
    name: subsecription.value?.name,
    description:subsecription.value?.description,
  qrLimit:subsecription.value?.qrLimit,
  price:subsecription.value?.price,
  tax:subsecription.value?.tax,

});


//funcitions
const saveEvent = ()=>{

    
if (subsecription.value.name===''){
  store.addNew().then(()=>{
  page.value?.closeDialog();

});
}
else {
  store.modify().then(()=>{
  page.value?.closeDialog();
 
});
}

  }

const searchFunction = (e:any)=>{
subsecriptions.value = tempArray.value ; 
subsecriptions.value = subsecriptions.value?.filter((item:any) =>{
return item.name.toLowerCase().includes(e.toLowerCase());
})
}
const editing = ref(false);
const openDialog =()=>{
  console.log('funtion works');
  editing.value=true
  page.value?.openDialog();
  
}
const resetDto  =()=>{
  subsecription.value = new SubsecriptionType();
}

</script>