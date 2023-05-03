import { QuestionController } from "@/api/endpoints/CommonQuestion";
import type {
  CommonQuestionDto,
  AddCommonQuestion,
  ModifyCommonQuestion,
  DeleteCommonQuestion,
} from "@/api/dto/CommonQuestion.dto";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useApi } from "@/composables/useApi";
const api = useApi();
interface Pagination {
  pageSize: number;
  pageIndex: number;
}
export const useQuestionStore = defineStore("commonQuestion", () => {
  const commonQuestion = ref<CommonQuestionDto[]>([]);
  const pagination = ref({
    pageSize: 5,
    pageIndex: 1,
  });
  const filterVal = ref("");

  //Actions
  async function GetCommonQuestion() {
    try {
      const response = await api.GET<CommonQuestionDto[]>(
        QuestionController.GetCommonQuestion
      );
      commonQuestion.value = response.data;
      return response;
    } catch (er) {
      console.log("error");
    }
  }

  async function AddCommonQuestion(payload: AddCommonQuestion) {
    const { data } = await api.POST(
      QuestionController.AddCommonQuestion,
      payload,
      { comfirm: false, error: true, success: "تمت اضافة السؤال بنجاح" }
    );
    commonQuestion.value?.unshift(data);
  }

  async function ModifyCommonQuestion(payload: ModifyCommonQuestion) {
    const { data } = await api.POST(
      QuestionController.ModifyCommonQuestion,
      payload,
      { comfirm: false, error: true, success: "تم تعديل السؤال بنجاح" }
    );
  }
  async function DeleteCommonQuestion(id: DeleteCommonQuestion) {
    const res = await api.DELETE(QuestionController.DeleteCommonQuestion, [id]);
  }
  function paginationQuestion(payload: Pagination) {
    pagination.value = {
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
    };
  }
  const paginateListQuestion = computed(() => {
    return filterListQuestion.value.slice(
      (pagination.value.pageIndex - 1) * pagination.value.pageSize,
      pagination.value.pageSize * pagination.value.pageIndex
    );
  });
  const filterListQuestion = computed(() => {
    return commonQuestion.value.filter(
      (ele: { question: string; answer: string }) =>
        ele.question.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        ele.answer.toLowerCase().includes(filterVal.value.toLowerCase()) ||
        !commonQuestion.value
    );
  });

  return {
    paginateListQuestion,
    filterListQuestion,
    paginationQuestion,
    pagination,
    GetCommonQuestion,
    AddCommonQuestion,
    ModifyCommonQuestion,
    DeleteCommonQuestion,
    commonQuestion,
  };
});
