<template>
  <Page
    ref="supportPage"
    :buttonText="$t('commonQuestion.title')"
    :dialogTitle="$t('commonQuestion.addQuestion')"
    :search="false"
    @close="router.go(-1)"
  >
    <template #dialog-form>
      <AddQuestion @formSubmit="closeForm"></AddQuestion>
    </template>
    <div>
      <div v-if="store.commonQuestion.length > 0">
        <div v-for="item in store.paginateListQuestion" :key="item.id">
          <v-card class="mx-auto tw-rounded-lg tw-shadow" style="margin-bottom: 12px">
            <v-card-title>
              <div class="flex justify-between">
                <h1>{{ item.question }}</h1>
                <p class="text-sm text-gray-500">
                  {{ $t("commonQuestion.question") }} ({{ item.order }})
                </p>
              </div>
            </v-card-title>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <p>....{{ item.answer.substring(0, 10) }}</p>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-col class="mt-4">
                    <v-text-field
                      v-model="item.order"
                      variant="filled"
                      :label="$t('commonQuestion.order')"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-4">
                    <v-text-field
                      v-model="item.question"
                      variant="filled"
                      :label="$t('commonQuestion.question')"
                    ></v-text-field>
                  </v-col>
                  <v-col class="mt-4">
                    <v-text-field
                      v-model="item.answer"
                      variant="filled"
                      :label="$t('commonQuestion.answer')"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-divider class="mt-5"></v-divider> -->
                  <div class="flex justify-center py-3 mt-3">
                    <v-btn color="blue-grey" class="px-12" @click="modify(item)">
                      {{ $t("commonQuestion.save") }}
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      color="danger"
                      class="px-12 mr-2"
                      @click="deleteQue(item)"
                    >
                      {{ $t("commonQuestion.delete") }}
                    </v-btn>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </div>
      </div>
      <div v-else>
        <div
          class="tw-bg-white tw-flex tw-justify-center p-5 bg-white items-center text-center"
        >
          <h1 class="tw-text-xl">There is no Data</h1>
        </div>
      </div>
      <div class="flex justify-center items-center w-full bg-white border-t-2">
        <v-pagination
          v-model="pagination.pageIndex"
          :length="Math.ceil(store.filterListQuestion.length / pagination.pageSize)"
          rounded="circle"
          @update:modelValue="paginate"
          :total-visible="6"
        ></v-pagination>
      </div>
    </div>
  </Page>
</template>
<script setup lang="ts">
import Page from "../../../components/global/Page.vue";
import { ref, reactive, computed } from "vue";
import { useQuestionStore } from "@/stores/CommonQuestion";
import AddQuestion from "./components/AddQuestion.vue";
import type {
  ModifyCommonQuestion,
  CommonQuestionDto,
  DeleteCommonQuestion,
} from "@/api/dto/CommonQuestion.dto";
import { useRouter } from "vue-router";
import { i18n } from "@/i18n";
const pagination = computed(() => store.pagination);
function paginate(e: any) {
  store.paginationQuestion({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}
const questionDto = reactive<ModifyCommonQuestion>({
  id: "",
  question: "",
  answer: "",
  order: 0,
});

const commonQuestionDto = reactive<DeleteCommonQuestion>({
  id: "",
});

const supportPage = ref<InstanceType<typeof Page> | null>(null);
function closeForm() {
  supportPage.value?.closeDialog();
}

function modify(item: CommonQuestionDto) {
  questionDto.id = item.id;
  questionDto.order = item.order;
  questionDto.question = item.question;
  questionDto.answer = item.answer;
  store.ModifyCommonQuestion(questionDto).then(() => store.GetCommonQuestion());
}
function deleteQue(item: CommonQuestionDto) {
  commonQuestionDto.id = item.id;
  store.DeleteCommonQuestion(commonQuestionDto.id).then(() => store.GetCommonQuestion());
}
const router = useRouter();
const store = useQuestionStore();
store.GetCommonQuestion();
</script>
