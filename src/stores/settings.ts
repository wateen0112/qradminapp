import { defineStore } from 'pinia';
import { SubsecriptionSettings } from '@/models/dto/settings';
import { SettingsController } from '@/api/endpoints/settings'
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
const api = useApi();
export const useSettingsStore = defineStore('settingStore', () => {
    
const subsecriptionSettings = ref <SubsecriptionSettings >( new SubsecriptionSettings() );
async function  getSubsecriptionSettings  (){
try  {
const res = await api.GET<SubsecriptionSettings>(SettingsController.GET_SUBSECRIPTION_SETTINGS);
subsecriptionSettings.value = res.data;

}
catch (err){
throw(err)
}
}

async function  modifySubscriptionsSettings(){
    try   {
const res  = await  api.POST (SettingsController.MODIFY_SUBSECRTIPION_SETTINGS,subsecriptionSettings.value,{success:'تم  تحديث البيانات بنجاح',
error:' حدث خطأ غير معروف'
},);
subsecriptionSettings.value = subsecriptionSettings.value
    }
    catch(err){
throw(err)
    }
}
    return { subsecriptionSettings,getSubsecriptionSettings,modifySubscriptionsSettings };
})