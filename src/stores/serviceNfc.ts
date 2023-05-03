import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
import { NfcController } from "@/api/endpoints/serviceNfc";
import type { DashNfc } from "@/models/dto/DashNfs";
import { ref, reactive } from "vue";
import { config } from "@fortawesome/fontawesome-svg-core";
export const NfcServiceStore = defineStore("Nfc", () => {
  const lang = ref(localStorage.getItem("lang") ?? "");
  const nfcTypes = ref<DashNfc[]>([]);
  const NfcDto = ref<DashNfc>({
    id: "",
    brief: "",
    howToUseIt: "",
  });
  const { GET, POST } = useApi();
  // axios.defaults.headers = lang
  async function getAll(lang: string) {
    const { data } = await GET<DashNfc[]>(
      NfcController.DashNfc,
      {},
      { comfirm: false, error: true, success: false },
      {
        headers: {
          lang: lang,
        },
      }
    );

    nfcTypes.value = data;
  }
  async function WebNfc(lang: string) {
    const { data } = await GET<DashNfc[]>(NfcController.WebNfc);
    nfcTypes.value = data;
  }
  async function modify(payload: any, lang: string) {
    const { data } = await POST(
      NfcController.ModifyNfc,
      payload,
      {
        comfirm: false,
        error: true,
        success: "تمت اضافة التعديلات بنجاح",
      },
      {
        headers: {
          lang: lang,
        },
      }
    );
    NfcDto.value = { ...data };
    // nfcTypes.value = nfcTypes.value?.filter((el: any) => {
    //   return el.id != UseNfc.value?.id;
    // });
    // nfcTypes.value?.push(data);
  }

  return { getAll, WebNfc, modify, NfcDto, nfcTypes, lang };
});
