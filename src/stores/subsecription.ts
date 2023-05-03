
import { SubsecibersController } from "@/api/endpoints/subsecriptions";
import { useApi } from "@/composables/useApi";
import { subsecriptionTypes } from "@/i18n/ar/subsecriptionTypes";
import{ SubsecriptionType } from "@/models/dto/Subsecription";
import { defineStore } from "pinia";
import { ref } from "vue";


const api = useApi();
export const useSubStore = defineStore("subscription", () => {

  //State
  const subsecriptions = ref<Array<SubsecriptionType>>();
  const tempArray = ref<Array<SubsecriptionType>>();
  const subsecription  = ref<SubsecriptionType>( new SubsecriptionType());
  //Actions
  //get all subscriptions data 
  async function getAllSubscription() {
try {
  const res = await api.GET<Array<SubsecriptionType>>(SubsecibersController.GET_ALL);
subsecriptions.value =  res.data;
tempArray.value =  res.data;

} catch (error) {
  throw (error)
}
  }
  //Get  a single subsecription by id 


//Add  a new subsecription 
async function addNew ( ){
  try {

    
    const res =  await api.POST(SubsecibersController.ADD,subsecription.value,{success:'تم أضافة نوع اشتراك جديد !'});
    subsecriptions.value?.push(res.data);
  } catch (error) {
    throw(error);
  }
}
//modify a subscription 
async function modify() {
try {
  
  const res =  await api.POST(SubsecibersController.MODIFY,subsecription.value,{
    success:'تم التعديل بنجاح',
    error:'حدث خطأ غير متوقع'
  });
  subsecriptions.value = subsecriptions.value?.filter((item:any)=>{
    return item.id !== subsecription.value?.id;
  })
    subsecriptions.value?.push(res.data);

} catch (error) {
  throw(error)
}
}

//Delete subscription item
async function deleteSubsecriber (payload:any) {
try {
  const res = await api.DELETE(SubsecibersController.DELETE,payload);
payload.forEach((ele:any)=>{
  subsecriptions.value= subsecriptions.value?.filter((item:any)=>{
    return item.id !=ele
  }
)
}
)} catch (error) {
  throw (error);
}
}
  return {subsecriptions, subsecription , getAllSubscription ,tempArray ,addNew, modify , deleteSubsecriber  };
});
