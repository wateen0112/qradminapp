import type { QrType } from "@/models/dto/QrType";
import { QrTypesController } from "@/models/dto/user.dto";
import { defineStore, storeToRefs } from "pinia";

import { ref, computed, watch } from "vue";
import { useApi } from "@/composables/useApi";
const api = useApi();
interface Pagination {
  pageSize: number;
  pageIndex: number;
}
export const useQrTypeStore = defineStore("qrtype", () => {
  //States
  const lang = ref('ar');

  const qrTypes = ref<QrType[]>([]);
  const tempArray = ref<Array<QrType>>();
  const pagination = ref({
    pageSize: 10,
    pageIndex: 1,
  });
  const filterVal = ref("");

  const qrType = ref<QrType>();
  //Actions
  async function getAll() {
    try {
      const res = await api.GET<QrType[]>(
        QrTypesController.GET_ALL,
        {},
        {},
        {
          headers: {
            lang: lang.value,
          },
        }
      );

      qrTypes.value = res.data;
      tempArray.value = res.data;
    } catch (err) {
      throw err;
    }
  }
  async function getById(id: any) {
    try {
      const res = await api.GET<QrType>(
        QrTypesController.GET_BY_ID + id,
        {},
        {},
        {
          headers: { lang: lang.value },
        }
      );
      qrType.value = res.data;
    } catch (err) {
      throw err;
    }
  }
  async function modify() {
    try {
      const res = await api.POST(
        QrTypesController.MODEIFY,
        qrType.value,
        {
          success: "operation done successfully",
          error: true,
        },
        {
          headers: {
            lang: lang.value,
          },
        }
      );
      qrType.value = res.data;
      qrTypes.value = qrTypes.value?.filter((i: any) => {
        return i.id != qrType.value?.id;
      });

      qrTypes.value?.push(res.data);
    } catch (err) {
      throw err;
    }
  }
  async function deletQrType(payload: any) {
    try {
      const res = await api.DELETE(QrTypesController.DELETE, payload);

      payload.forEach((delItem: any) => {
        qrTypes.value = qrTypes.value?.filter((qr: any) => delItem !== qr.id);
      });
    } catch (err) {
      throw err;
    }
  }

  function paginationQr(payload: Pagination) {
    pagination.value = {
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
    };
  }
  const paginateListQr = computed(() => {
    return filterListQr.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex
    );
  });
  const filterListQr = computed(() => {
    return qrTypes.value.filter(
      (ele: { name: string; description: string }) =>
        ele.name.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        ele.description.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        !qrType.value
    );
  });
  watch(lang, () => {
    getAll();
    getById(qrType.value?.id)
  });
  return {
    qrType,
    qrTypes,
    getAll,
    getById,
    modify,
    deletQrType,
    tempArray,
    paginateListQr,
    paginationQr,
    pagination,
    filterListQr,
    lang,
  };
});
