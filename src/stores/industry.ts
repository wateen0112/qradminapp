import { isTemplateNode } from '@vue/compiler-core';
import {defineStore} from 'pinia';
import {ref} from 'vue'
import { SettingsController } from '@/api/endpoints/settings';
import { useApi } from '@/composables/useApi';
const api = useApi();
export const useIndustryStore  = defineStore('industry',()=>{
const industries = ref<Array<Industry>>([]);
async function getAllData (){
try  {
const res =await api.GET<Array<Industry>>(SettingsController.GET_ALL_INDUSTRY);
industries.value  = res.data;
return res  ; 
}
catch(err){
    throw(err);
}

 }
async function addIndustry (payload:any){
    let msg ='تم اضافة الصناعة بنجاح'
try {
    if(payload.id){
         msg ='تم تعديل الصناعة بنجاح  '
    }
    const res =  await api.POST(SettingsController.UPER_SET_INDUSTTY,payload,{success:msg})
if(payload.id){
    industries.value=industries.value.filter((item) =>{
        return item.id !=payload.id
    })

}

    industries.value.push(res.data)

}
catch (err){

}
}
async function deleteIndustry (payload:any){
    try  {
const res = await api.DELETE(SettingsController.DELETE_INDUSTRY,payload);

payload.forEach((i:any)=>{
    industries.value= industries.value.filter((item:any) =>{
    return   item.id !==i;
})
} )
    }
    catch(err){
console.log(err);

    }
}

 return  {industries,getAllData,addIndustry,deleteIndustry}
})