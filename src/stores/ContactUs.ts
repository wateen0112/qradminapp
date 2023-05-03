import { defineStore } from "pinia";
import { ContactUsController } from "@/api/endpoints/contactUs";
import type {
  GetContactUsDto,
  contactsDto,
  enterpriseSalesRequestDto,
  ReplyContatUsDto,
  ReplyEnterpriseDto,
  enterprisrDetailsDto,
} from "@/api/dto/contactUs.dto";
import { ref, computed } from "vue";
import { useApi } from "@/composables/useApi";
const api = useApi();
interface Pagination {
  pageSize: number;
  pageIndex: number;
}
export const useContactStore = defineStore("contactUs", () => {
  //State
  const pagination = ref({
    pageSize: 5,
    pageIndex: 1,
  });
  const contactList = ref<contactsDto[]>([]);
  const enterprisList = ref<enterpriseSalesRequestDto[]>([]);
  const replyList = ref<ReplyContatUsDto>();
  const enterpriseList = ref<enterprisrDetailsDto[]>([]);
  const filterVal = ref("");

  //Actions
  function paginationContact(payload: Pagination) {
    pagination.value = {
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
    };
  }
  const paginateListContact = computed(() => {
    return filterListContact.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex
    );
  });
  const paginateListEnterprise = computed(() => {
    return filterListEnterprise.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex
    );
  });

  //search
  function findContact(payload: string) {
    filterVal.value = payload;
  }
  //search
  const filterListContact = computed(() => {
    return contactList.value.filter(
      (ele: {
        senderName: string;
        senderEmail: string;
        content: string;
        title: string;
      }) =>
        ele.senderName.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        ele.title.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        ele.content.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        ele.senderEmail.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        !contactList.value
    );
  });
  const filterListEnterprise = computed(() => {
    return enterprisList.value.filter(
      (ele: { senderName: string }) =>
        ele.senderName.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        !enterprisList.value
    );
  });

  async function GetContactUs() {
    const response = await api.GET<GetContactUsDto>(
      ContactUsController.Get_All_Contact
    );
    contactList.value = response.data.contactsUs;
    enterprisList.value = response.data.enterpriseSalesRequest;
    console.log(contactList, "test");
    return response;
  }

  async function GetDetailsContact(id: any) {
    const response: any = await api.GET(
      ContactUsController.Get_Details_Contact + id
    );
    contactList.value = response.data;
  }

  async function GetDetailsEnterprise(id: any) {
    const response: any = await api.GET(
      ContactUsController.Get_Details_Enterprise + id
    );
    enterpriseList.value = response.data;
  }

  async function ReplyContact(payload: ReplyContatUsDto) {
    const { data } = await api.POST(
      ContactUsController.Reply_Contact,
      payload,
      { comfirm: false, error: true, success: "تمت الرد على الطلب بنجاح" }
    );
    replyList.value = data;
  }

  async function ReplyEnterprise(payload: ReplyEnterpriseDto) {
    const { data } = await api.POST(
      ContactUsController.Reply_Contact_Enterprise,
      payload,
      { comfirm: false, error: true, success: "تمت الرد على الطلب بنجاح" }
    );
    enterpriseList.value = data;
  }
  async function DeleteContactUs(ids: string[]) {
    const res = await api.DELETE(ContactUsController.Delete_Contact, ids);
    contactList.value = contactList.value?.filter(
      (item: any) => !ids.includes(item.id)
    );
  }
  async function DeleteContactUsEnterprise(ids: string[]) {
    const res = await api.DELETE(
      ContactUsController.Delete_Contact_Enterprise,
      ids
    );
    enterprisList.value = enterprisList.value?.filter(
      (item: any) => !ids.includes(item.id)
    );
  }

  return {
    paginationContact,
    paginateListContact,
    paginateListEnterprise,
    filterListContact,
    filterListEnterprise,
    findContact,
    GetContactUs,
    GetDetailsContact,
    GetDetailsEnterprise,
    DeleteContactUs,
    DeleteContactUsEnterprise,
    contactList,
    ReplyContact,
    ReplyEnterprise,
    enterpriseList,
    replyList,
    pagination,
    enterprisList,
  };
});
