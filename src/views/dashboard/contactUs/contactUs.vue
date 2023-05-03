<template>
  <Page
    :placeholder="$t('contact.searchQuery')"
    :add="false"
    @search="searchContact($event)"
  >
    <v-card
      class="flex flex-col justify-center items-center text-center bg-light border-none shadow-none"
    >
      <v-tabs v-model="tab" bg-color="light">
        <v-tab value="one">{{ $t("contact.communication") }}</v-tab>
        <v-tab value="two"> {{ $t("contact.requests") }} </v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <!--contactUs-->
          <v-window-item value="one">
            <b-col cols="12">
              <v-card>
                <v-card-title class="flex justify-between">
                  <v-checkbox
                    v-if="!isMulti"
                    :value="selectList"
                    v-model="selectList"
                    color="primary"
                    hide-details
                    @change="selectAll"
                  ></v-checkbox>
                  <v-checkbox
                    v-else
                    v-model="isMulti"
                    indeterminate
                    color="primary"
                    hide-details
                    @change="popSelectAll"
                  ></v-checkbox>
                  <v-btn icon color="light" @click="deleteById">
                    <v-icon size="small" color="danger">mdi-delete</v-icon>
                  </v-btn>
                </v-card-title>
              </v-card>
            </b-col>
            <div v-if="store.contactList.length">
              <b-col cols="12" v-for="item in store.paginateListContact" :key="item">
                <v-card class="mt-1">
                  <div class="flex justify-between items-center p-5">
                    <div class="flex items-center">
                      <v-checkbox
                        v-if="item.id"
                        v-model="selectSingalList"
                        color="primary"
                        :value="item.id"
                        @select="removeItem"
                        hide-details
                        @change="selectAllSingal(item.id)"
                      ></v-checkbox>
                      {{ item.title }}
                    </div>
                    <p>{{ item.senderName }}</p>
                    <p>{{ item.senderPhoneNumber }}</p>
                    <p>{{ new Date(item.sendDate).toLocaleDateString() }}</p>
                    <v-btn icon color="light" @click="goToDetails(item.id)">
                      <v-icon size="small">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </div>
                  <v-divider></v-divider>

                  <div class="flex justify-start p-5 text-stone-500">
                    <div v-if="item.isReplied == true">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="9" cy="9" r="8.5" stroke="#21F31C" />
                        <circle cx="9" cy="9" r="4" fill="#21F31C" />
                      </svg>
                    </div>
                    <div v-else>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="9" cy="9" r="8.5" stroke="#F81111" />
                        <circle cx="9" cy="9" r="4" fill="#F81111" />
                      </svg>
                    </div>
                    <p class="ml-2">{{ item.content }}</p>
                  </div>
                </v-card>
              </b-col>
            </div>
            <div class="flex justify-center items-center w-full bg-white border-t-2">
              <v-pagination
                v-model="pagination.pageIndex"
                :length="Math.ceil(store.filterListContact.length / pagination.pageSize)"
                rounded="circle"
                @update:modelValue="paginate"
                :total-visible="6"
              ></v-pagination>
            </div>
          </v-window-item>

          <!--Enterprise-->
          <v-window-item value="two">
            <b-col cols="12">
              <v-card>
                <v-card-title class="flex justify-between">
                  <v-checkbox
                    v-if="!isMulti"
                    :value="selectList"
                    v-model="selectList"
                    color="primary"
                    hide-details
                    @change="selectAll"
                  ></v-checkbox>
                  <v-checkbox
                    v-else
                    v-model="isMulti"
                    indeterminate
                    color="primary"
                    hide-details
                    @change="popSelectAll"
                  ></v-checkbox>
                  <v-btn icon color="light" @click="deleteByEnterprise">
                    <v-icon size="small" color="danger">mdi-delete</v-icon>
                  </v-btn>
                </v-card-title>
              </v-card>
            </b-col>
            <div v-if="store.enterprisList.length">
              <b-col
                cols="12"
                v-for="item in store.paginateListEnterprise"
                :key="item.id"
              >
                <v-card class="mt-1">
                  <div class="flex justify-between items-center p-5">
                    <div class="flex items-center">
                      <v-checkbox
                        v-if="item.id"
                        v-model="selectSingalList"
                        color="primary"
                        :value="item.id"
                        @select="removeItem"
                        hide-details
                        @change="selectAllSingal(item.id)"
                      ></v-checkbox>
                      <div v-if="item.isReplied == true">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="9" cy="9" r="8.5" stroke="#21F31C" />
                          <circle cx="9" cy="9" r="4" fill="#21F31C" />
                        </svg>
                      </div>
                      <div v-else>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="9" cy="9" r="8.5" stroke="#F81111" />
                          <circle cx="9" cy="9" r="4" fill="#F81111" />
                        </svg>
                      </div>
                      <p class="ml-2">{{ item.senderName }}</p>
                    </div>
                    <p>{{ item.senderPhoneNumber }}</p>
                    <p>{{ new Date(item.sendDate).toLocaleDateString() }}</p>
                    <v-btn icon color="light" @click="getDetails(item)">
                      <v-icon size="small">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </div>
                  <v-divider></v-divider
                ></v-card>
              </b-col>
            </div>
            <div class="flex justify-center items-center w-full bg-white border-t-2">
              <v-pagination
                v-model="pagination.pageIndex"
                :length="
                  Math.ceil(store.filterListEnterprise.length / pagination.pageSize)
                "
                rounded="circle"
                @update:modelValue="paginate"
                :total-visible="6"
              ></v-pagination>
            </div>
            <!--dialog contact Enterprise-->
            <v-dialog
              width="1250"
              v-model="dialog"
              :scrim="false"
              transition="dialog-bottom-transition"
            >
              <v-card class="form">
                <v-card-title class="bg-amber-100 flex justify-between">
                  <span> more than 10 QR </span>
                  <v-icon @click="dialog = false" size="small">mdi-close</v-icon>
                </v-card-title>
                <!-- Top left yellow code -->

                <v-container>
                  <!--title & description-->
                  <div class="titleCard flex flex-col justify-center text-center mt-5">
                    <h1 class="text-3xl font-bold">Enterprise Sales Requests</h1>

                    <p class="m-4" style="line-height: 2">
                      You are looking for a customized solution for your organization, you
                      want more QR codes, white labeling, API, and other additional
                      features, then contact us via this form! Please provide the
                      following data to us, and we are going to get in touch with you
                      within the next days.
                    </p>
                  </div>
                  <Form class="tw-w-full md:tw-px-28 tw-px-5">
                    <div class="tw-mt-5">
                      <!-- company name -->
                      <v-text-field
                        readonly
                        class="mt-4"
                        type="input"
                        variant="solo"
                        label="Company Name"
                        v-model="enterpriseList.companyName"
                      ></v-text-field>

                      <!-- name-->
                      <v-text-field
                        readonly
                        class="mt-4"
                        type="input"
                        variant="solo"
                        label="Name"
                        v-model="enterpriseList.name"
                      ></v-text-field>

                      <!-- email-->
                      <v-text-field
                        readonly
                        class="mt-4"
                        type="input"
                        variant="solo"
                        label="Email address from your registered trial or paid account"
                        v-model="enterpriseList.email"
                      >
                      </v-text-field>

                      <h1 class="mb-5 mt-5 font-bold">Type of Business</h1>
                      <!--select possible consulting-->
                      <v-col cols="12" lg="6" class="mt-2 selectType">
                        <ClientOnly>
                          <v-select
                            readonly
                            v-model="enterpriseList.industryId"
                            label="For the best possible consulting, please let us know who you are:"
                            :items="industries"
                            item-title="name"
                            item-value="id"
                          ></v-select>
                        </ClientOnly>
                      </v-col>

                      <!--Telephone Number-->
                      <v-text-field
                        readonly
                        class="mt-5"
                        type="input"
                        variant="solo"
                        label="Telephone Number with country code"
                        v-model="enterpriseList.phoneNumber"
                      ></v-text-field>

                      <v-text-field
                        readonly
                        class="mt-5"
                        type="input"
                        variant="solo"
                        label=" QR Codes would you like to create (per year)?"
                        v-model="enterpriseList.qrCount"
                      ></v-text-field>

                      <v-text-field
                        readonly
                        class="mt-5"
                        type="input"
                        variant="solo"
                        label="What type of QR Codes do you want to create?"
                        v-model="enterpriseList.qrType"
                      ></v-text-field>

                      <!-- note-->
                      <h1 class="mt-5 font-bold">
                        Please describe in short your planned usage of QR Codes
                      </h1>
                      <p class="mt-4 mb-3 text-gray-400">
                        This helps us to get a better idea of your project that you want
                        to archive with us. We want to see how we can assist you. Our goal
                        is to recommend the plan that suits your needs best.
                      </p>
                      <v-textarea
                        readonly
                        class="mt-10"
                        variant="solo"
                        rows="3"
                        label="description"
                        v-model="enterpriseList.description"
                      ></v-textarea>

                      <div class="mt-10">
                        <h1 class="font-bold">Reply to order</h1>
                        <v-textarea
                          :readonly="enterpriseList.isReplied ? true : false"
                          class="mt-10"
                          variant="underlined"
                          rows="3"
                          label="reply"
                          v-model="enterpriseList.reply"
                        ></v-textarea>
                      </div>
                    </div>
                    <!--btn submit & img code-->
                    <div class="flex justify-center mt-8">
                      <v-btn
                        class="mt-2 px-9"
                        size="large"
                        @click="ReplyEnterprise(store.enterpriseList)"
                      >
                        {{ $t("contact.save") }}
                      </v-btn>
                      <v-btn
                        class="mt-2 mx-2 px-9"
                        color="danger"
                        size="large"
                        variant="outlined"
                        @click="dialog = false"
                      >
                        {{ $t("contact.back") }}
                      </v-btn>
                    </div>
                  </Form>
                </v-container>
              </v-card>
            </v-dialog>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </Page>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import Page from "../../../components/global/Page.vue";
import { ref, computed, reactive, watch } from "vue";
import { useContactStore } from "@/stores/ContactUs";
import { Form } from "vee-validate";
import { useIndustryStore } from "@/stores/industry";
import type { ReplyEnterpriseDto } from "@/api/dto/contactUs.dto";
const contact = computed(() => store.contactList);
const enterpriseList = computed(() => store.enterpriseList);
const selectSingalList = ref<Array<string>>([]);
const selectList = ref<Array<string>>([]);
const isMulti = ref();
const ids = ref<Array<string>>([]);
const pagination = computed(() => store.pagination);
const stores = useContactStore();
const industries = computed(() => industry.industries);
const tab = ref("");
const dialog = ref(false);
const router = useRouter();
const store = useContactStore();
store.GetContactUs();
const replyDto = reactive<ReplyEnterpriseDto>({
  id: "",
  reply: "",
});
function paginate(e: any) {
  store.paginationContact({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}
function selectAll() {
  contact.value?.forEach((element: any) => {
    selectSingalList.value.push(element.id);
  });
  isMulti.value = !isMulti.value;
}
function popSelectAll() {
  selectSingalList.value.splice(0, selectSingalList.value.length);
}
function deleteById() {
  store.DeleteContactUs(selectList.value);
}
function deleteByEnterprise() {
  store.DeleteContactUsEnterprise(selectList.value);
}
//select singal id
function selectAllSingal(ids: any) {
  selectList.value.push(ids);
}
function removeItem(rows: Array<any>) {
  ids.value = rows.map((ele) => ele.id);
}
watch(selectList.value, () => {
  if (selectList.value.length > 0) {
    isMulti.value = true;
  } else {
    isMulti.value = false;
  }
});

const industry = useIndustryStore();
industry.getAllData();

function goToDetails(id: string) {
  router.push(`contact/${id}`);
}
function getDetails(target: any) {
  dialog.value = true;
  stores.GetDetailsEnterprise(target.id);
}
function ReplyEnterprise(target: any) {
  replyDto.id = target.id;
  replyDto.reply = target.reply;
  store.ReplyEnterprise(replyDto).then(() => (dialog.value = false));
}
function searchContact(e: any) {
  store.findContact(e);
}
</script>
<style>
.v-card .v-card-text {
  line-height: 1.25rem;
  width: 100%;
}
</style>
