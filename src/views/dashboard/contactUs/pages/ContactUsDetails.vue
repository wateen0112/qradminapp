<template>
  <Page :add="false" :search="false">
    <div>
      <v-card class="mt-1 shadow">
        <div class="flex justify-between items-center p-5">
          <p>{{ contact.senderName }}</p>
          <p>{{ contact.senderPhoneNumber }}</p>
          <p>
            {{ new Date(contact.sendDate).toLocaleDateString() }}
            <v-btn icon color="light" @click="deleteContact(contact)">
              <v-icon size="small">mdi-delete</v-icon>
            </v-btn>
          </p>
        </div>
        <v-divider></v-divider>
        <div class="flex justify-between items-center p-5">
          <h1 class="text-2xl font-bold">{{ contact.title }}</h1>
          <p>{{ contact.senderEmail }}</p>
        </div>
        <div class="p-5">
          <p>{{ contact.content }}</p>
        </div>
      </v-card>
    </div>
    <v-card class="mt-5 shadow">
      <v-card-item>
        <div class="flex justify-between">
          <p class="font-thin text-gray-600">{{ $t("contact.reply") }}</p>
          <p>{{ getDate() }}</p>
        </div>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text
        ><v-textarea
          :readonly="contact.isReplied ? true : false"
          class="mt-5"
          variant="plain"
          :rows="3"
          v-model="contact.reply"
        ></v-textarea
      ></v-card-text>
      <v-divider class="mt-3"></v-divider>
      <v-card-actions class="flex justify-end p-3 mt-3"
        ><div>
          <v-btn
            variant="flat"
            color="blue-grey"
            class="px-10"
            @click="ReplyContact(contact)"
          >
            {{ $t("contact.save") }}
          </v-btn>
          <v-btn variant="outlined" color="danger" class="px-10" to="/setting/contact">{{
            $t("contact.back")
          }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </Page>
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import Page from "@/components/global/Page.vue";
import { useContactStore } from "@/stores/ContactUs";
import type { ReplyContatUsDto, DeleteContactDto } from "@/api/dto/contactUs.dto";
import { useRouter } from "vue-router";
import { i18n } from "@/i18n";
const contact = computed(() => store.contactList);
const router = useRouter();
const props = defineProps({
  id: String,
});
const store = useContactStore();
store.GetDetailsContact(props.id);
const replyDto = reactive<ReplyContatUsDto>({
  id: "",
  reply: "",
});
const DeleteDto = reactive<DeleteContactDto>({
  id: "",
});
function getDate() {
  const today = new Date();
  const date = today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  return date;
}
function ReplyContact(target: any) {
  replyDto.id = target.id;
  replyDto.reply = target.reply;
  store.ReplyContact(replyDto).then(() => router.go(-1));
}
function deleteContact(target: any) {
  if (props && props.id)
    store.DeleteContactUs([props.id]).then(() => {
      router.go(-1);
    });
}
</script>
