<template>
  <Form :validation-schema="schema" ref="formCommon">
    <v-form>
      <v-col>
        <Field v-slot="{ field }" name="question">
          <v-text-field
            v-model="questionDto.question"
            v-bind="field"
            variant="underlined"
            :label="$t('commonQuestion.question')"
          ></v-text-field>
        </Field>
        <ErrorMessage name="question" class="text-danger text-sm mt-2"> </ErrorMessage>
      </v-col>
      <v-col>
        <Field v-slot="{ field }" name="answer">
          <v-text-field
            v-model="questionDto.answer"
            v-bind="field"
            variant="underlined"
            :label="$t('commonQuestion.answer')"
          ></v-text-field>
        </Field>
        <ErrorMessage name="answer" class="text-danger text-sm pt-1"> </ErrorMessage>
      </v-col>
      <v-divider></v-divider>

      <div class="mt-3">
        <v-btn variant="flat" color="primary" @click="submit" class="m-2 text-white">
          {{ $t("commonQuestion.add") }}
        </v-btn>
        <v-btn variant="outlined" color="primary" @click="cancel" c lass="m-2">
          {{ $t("commonQuestion.back") }}
        </v-btn>
      </div>
    </v-form>
  </Form>
</template>
<script lang="ts" setup>
import type { AddCommonQuestion } from "@/api/dto/CommonQuestion.dto";
import { useQuestionStore } from "@/stores/CommonQuestion";
import * as yup from "yup";
import { reactive, computed } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { i18n } from "@/i18n";
const emit = defineEmits(["formSubmit"]);
const store = useQuestionStore();
const questionDto = reactive<AddCommonQuestion>({
  question: "",
  answer: "",
});
function submit() {
  store.AddCommonQuestion(questionDto).then(() => {
    emit("formSubmit");
  });
}
function cancel() {
  emit("formSubmit");
}
const schema = computed(() => {
  return yup.object({
    question: yup.string().required("Question is required"),
    answer: yup.string().required("Answer is required"),
  });
});
</script>
