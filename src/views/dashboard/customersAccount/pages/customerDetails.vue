<template>
  <Page :add="false" :search="false">
    <template #action-button>
      <div class="flex justify-center items-center gap-3">
        <v-btn variant="tonal" color="success" @click="edit">{{
          $t("customers.edit")
        }}</v-btn>
        <v-btn variant="outlined" color="danger" @click="delCustomer">{{
          $t("customers.delete")
        }}</v-btn>

        <v-btn variant="outlined" color="primary" @click="blockEve">
          {{
            customerDetailsDto.isBlocked ? $t("customers.unBlock") : $t("customers.block")
          }}
        </v-btn>
        <v-btn variant="outlined" color="primary" @click="router.go(-1)">
          {{ $t("customers.back") }}
        </v-btn>
      </div>
    </template>
    <div class="costumer-details">
      <div class="bg-white p-5 rounded">
        <Form
          ref="myForm"
          :initial-values="customerDetailsDto"
          :validation-schema="schema"
          class="grid grid-cols-12 gap-5"
        >
          <div class="md:col-span-3 col-span-12">
            <Field name="name" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('customers.name')"
                v-model="customerDetailsDto.name"
              ></v-text-field>
            </Field>
            <ErrorMessage name="name" v-slot="{ message }"
              ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
            >
          </div>
          <div class="md:col-span-3 col-span-12">
            <Field name="email" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('customers.email')"
                v-model="customerDetailsDto.email"
              ></v-text-field>
            </Field>
            <ErrorMessage name="email" v-slot="{ message }"
              ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
            >
          </div>
          <div class="md:col-span-3 col-span-12">
            <Field name="phoneNumber" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('customers.phoneNumber')"
                v-model="customerDetailsDto.phoneNumber"
              ></v-text-field>
            </Field>
            <ErrorMessage name="phoneNumber" v-slot="{ message }"
              ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
            >
          </div>
          <div class="md:col-span-3 col-span-12">
            <Field name="newPassword" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('customers.password')"
                v-model="customerDetailsDto.newPassword"
              ></v-text-field>
            </Field>
            <ErrorMessage name="newPassword" v-slot="{ message }"
              ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
            >

          </div>
          <div class="md:col-span-3 col-span-12">
         
              <v-text-field
                v-bind="field"
                :label="$t('customers.company')"
                v-model="customerDetailsDto.company"
              ></v-text-field>

            <ErrorMessage name="company" v-slot="{ message }"
              ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
            >
          </div>
          <div class="md:col-span-3 col-span-12">
            <!-- {{ customerDetailsDto.countryId }} -->
           
            <v-select
              :label="$t('customers.country')"
              v-model="customerDetailsDto.countryId"
              :items="countries"
              item-value="id"
              item-title="country"
            ></v-select>
   
          </div>
          <div class="md:col-span-3 col-span-12">
            <!-- {{ customerDetailsDto.cityId }} -->
            <Field name="cityId" v-slot="{ field }"  v-model="customerDetailsDto.cityId">
            <v-select
              :label="$t('customers.city')"
              v-model="customerDetailsDto.cityId"
              :items="
                countries.find((el) => el.id == customerDetailsDto.countryId)?.cities
              "
              item-value="id"
              item-title="city"
            ></v-select>
            </Field>
          </div>
          <div class="md:col-span-3 col-span-12">
            
            <v-select
              v-if="customerDetailsDto.cityId"
              disabled
              :value="
                countries
                  .find((el) => el.id == customerDetailsDto.countryId)
                  ?.cities.map((e) => e.zipCode)
              "
              item-title="zipCode"
              item-value="id"
            ></v-select>
          </div>
          <div class="md:col-span-3 col-span-12">
            
            <Field name="street" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('customers.street')"
                v-model="customerDetailsDto.street"
              ></v-text-field>
            </Field>
            <ErrorMessage name="street" v-slot="{ message }"
              ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
            >
          </div>
          <div class="md:col-span-3 col-span-12">
            <Field name="industry" v-slot="{ field }"  v-model="customerDetailsDto.industryId">
            <v-select
              :label="$t('customers.industries')"
              :items="industries"
              item-title="name"
              item-value="id"
              v-model="customerDetailsDto.industryId"
            ></v-select>
            </Field>
          </div>
          <div class="md:col-span-3 col-span-12">
            <Field name="website" v-slot="{ field }">
              <v-text-field
                v-bind="field"
                :label="$t('customers.website')"
                v-model="customerDetailsDto.website"
              ></v-text-field>
            </Field>
            <ErrorMessage name="website" v-slot="{ message }"
              ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
            >
          </div>
        </Form>
      </div>
      <!-- {{ store.customerDetailsDto.qrs }} -->
      <div class="mt-10">
        <v-card>
          <v-tabs v-model="tab" bg-color="#f3f4f6 " centered fixed-tabs>
            <v-tab value="tab-1">
              <v-icon>mdi-qrcode</v-icon>
              {{ $t("customers.qrCode") }}
            </v-tab>

            <v-tab value="tab-2">
              <v-icon>mdi-message-reply-text-outline</v-icon>
              {{ $t("customers.subscriptions") }}
            </v-tab>

            <v-tab value="tab-3">
              <v-icon>mdi-account-box</v-icon>
              {{ $t("customers.edits") }}
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item v-for="i in 3" :key="i" :value="'tab-' + i">
              <v-card>
                <div v-if="i == 1">
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">{{ $t("customers.qrName") }}</th>
                        <th class="text-left">
                          {{ $t("customers.qrCodeType") }}
                        </th>
                        <th class="text-left">{{ $t("customers.folder") }}</th>
                        <th class="text-left">
                          {{ $t("customers.dateCreated") }}
                        </th>
                        <th class="text-left">
                          {{ $t("customers.numberScans") }}
                        </th>
                        <th class="text-left">{{ $t("customers.modify") }}</th>
                        <th class="text-left">{{ $t("customers.details") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in paginateQrs" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.qrIndex }}</td>
                        <td>{{ item.folder }}</td>
                        <td>
                          {{ new Date(item.dateCreated).toLocaleDateString() }}
                        </td>
                        <td>{{ item.scansCount }}</td>
                        <td>
                          <v-btn
                            icon
                            size="md"
                            variant="text"
                            color="red"
                            @click="deleteQrType(item.id, item.qrType)"
                          >
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            size="md"
                            variant="text"
                            class="ml-3"
                            color="green"
                            @click="editQrCode(item)"
                          >
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </td>
                        <td>
                          <v-btn icon size="md" variant="text" @click="goToDetails(item)">
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <div
                    class="flex justify-center items-center w-full bg-white border-t-2"
                  >
                    <v-pagination
                      v-model="pagQr.pageIndex"
                      :length="slide(customerDetailsDto.qrs, i)"
                      rounded="circle"
                      @update:modelValue="paginate($event, i)"
                      :total-visible="10"
                      class="flex justify-center items-center w-full"
                    ></v-pagination>
                  </div>
                </div>
                <div v-if="i == 2">
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          {{ $t("customers.subscriberName") }}
                        </th>
                        <th class="text-left">
                          {{ $t("customers.subscriberPrice") }}
                        </th>
                        <th class="text-left">
                          {{ $t("customers.totalCode") }}
                        </th>

                        <th class="text-left">
                          {{ $t("customers.activationDate") }}
                        </th>
                        <th class="text-left">
                          {{ $t("customers.numberActive") }}
                        </th>
                        <th class="text-left">
                          {{ $t("customers.subscriptions") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in paginateSubscriptions" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.qrLimit }}</td>
                        <td>
                          {{ new Date(item.activeDate).toLocaleDateString() }}
                        </td>
                        <td>{{ item.activatedCodesCount }}</td>
                        <td>
                          <v-btn
                            size="md"
                            variant="text"
                            color="green"
                            @click="activateSub(item.id)"
                          >
                            activate
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <div
                    class="flex justify-center items-center w-full bg-white border-t-2"
                  >
                    <v-pagination
                      v-model="pagSub.pageIndex"
                      :length="slide(customerDetailsDto.subscriptions, i)"
                      rounded="circle"
                      @update:modelValue="paginate($event, i)"
                      :total-visible="10"
                      class="flex justify-center items-center w-full"
                    ></v-pagination>
                  </div>
                </div>
                <div v-if="i == 3">
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">{{ $t("customers.qrName") }}</th>
                        <th class="text-left">
                          {{ $t("customers.numberVersions") }}
                        </th>
                        <th class="text-left">
                          {{ $t("customers.effectiveVersion") }}
                        </th>
                        <th class="text-left">
                          {{ $t("customers.versionsDetails") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in paginateQrModifies" :key="item.id">
                        <td>{{ item.qrName }}</td>
                        <td>{{ item.versionsCount }}</td>
                        <td>{{ item.activatedVersion }}</td>
                        <td>
                          <v-btn
                            icon
                            size="md"
                            variant="text"
                            @click="setVersionQr(item.id, item.qrIndex)"
                          >
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <div
                    class="flex justify-center items-center w-full bg-white border-t-2"
                  >
                    <v-pagination
                      v-model="pagModify.pageIndex"
                      :length="slide(customerDetailsDto.qrsModified, i)"
                      rounded="circle"
                      @update:modelValue="paginate($event, i)"
                      :total-visible="10"
                      class="flex justify-center items-center w-full"
                    ></v-pagination>
                  </div>
                </div>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </div>
  </Page>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { Field, ErrorMessage, Form } from "vee-validate";
import { useCustomerStore } from "@/stores/customers";
import { useUserStore } from "@/stores/user";
import { useIndustryStore } from "@/stores/industry";
import Page from "@/components/global/Page.vue";
import { computed, ref } from "vue";
import { useApi } from "@/composables/useApi";

import * as yup from "yup";
import { i18n } from "@/i18n";
import { storeToRefs } from "pinia";
import { AppConfig } from "@/app.config";
const store = useCustomerStore();
const { customerDetailsDto } = storeToRefs(store);
const tab = ref(null);
// const { t } = useI18n();
const storeUser = useUserStore();
const industry = useIndustryStore();
const industries = computed(() => industry.industries);
const countries = computed(() => store.countries);
const { GET } = useApi();
const pagQr = ref({
  pageSize: 10,
  pageIndex: 1,
});
const pagModify = ref({
  pageSize: 10,
  pageIndex: 1,
});
const pagSub = ref({
  pageSize: 10,
  pageIndex: 1,
});
const paginateQrs = computed(() => {
  return customerDetailsDto.value.qrs.slice(
    (pagQr.value.pageIndex - 1) * pagQr.value.pageSize,
    pagQr.value.pageSize * pagQr.value.pageIndex
  );
});
const paginateSubscriptions = computed(() => {
  return customerDetailsDto.value.subscriptions.slice(
    (pagSub.value.pageIndex - 1) * pagSub.value.pageSize,
    pagSub.value.pageSize * pagSub.value.pageIndex
  );
});
const paginateQrModifies = computed(() => {
  return customerDetailsDto.value.qrsModified.slice(
    (pagModify.value.pageIndex - 1) * pagModify.value.pageSize,
    pagModify.value.pageSize * pagModify.value.pageIndex
  );
});

const myPassword = computed(() => {
  return customerDetailsDto.value.newPassword;
});

const router = useRouter();
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = computed(() => {
  return yup.object({
    name: yup.string().required(i18n.global.t("customers.nameError")).nullable(),
    email: yup
      .string()
      .required(i18n.global.t("customers.emailError"))
      .email(i18n.global.t("customers.unSupportEmail"))
      .nullable(),
    newPassword:
      myPassword.value === ""
        ? yup.string()
        : yup.string().required().min(4, i18n.global.t("customers.passwordError")),
   
   phoneNumber :yup.number()
   
  });
});
const props = defineProps({
  id: String,
});
async function goToDetails(item: any) {
  try {
    const token = localStorage.getItem("AccessToken");
    //  window.open(

    // `${AppConfig.DOMAIN_HOST_CUSTOMER}/login?token=${token}`
    // );
    window.open(
      `${AppConfig.DOMAIN_HOST_CUSTOMER}/${
        item.qrIndex.toString().includes("Static") ? "static" : "dynamic"
      }/${item.qrIndex}/${item.id}?token=${token}`
    );

    const res = await GET(
      AppConfig.DOMAIN_HOST_CUSTOMER + "Customer/Qr/GetById/" + item.id,
      {},
      {},
      {}
    );
  } catch (error) {
    console.log(error);
  }
}
function setVersionQr(idQr: string, qrIndex: string) {
  router.push({
    path: `/main/customersAccount/${props.id}/versionsQr`,
    query: { id: idQr, qrIndex: qrIndex },
  });
}
function editQrCode(item: any) {
  window.open(`${AppConfig.DOMAIN_HOST_CUSTOMER}/dynamic/${item.qrIndex}/${item.id}`);
}
function deleteQrType(id: string, qrIndex: string) {
  store.deleteQr({ id: id, qrIndex: qrIndex });
}
function activateSub(id: string) {
  store.activateSubscription(id);
}
function slide(list: any, i: number) {
  if (i == 1) return Math.ceil(list.length / pagQr.value.pageSize);
  else if (i == 2) return Math.ceil(list.length / pagSub.value.pageSize);
  else if (i == 3) return Math.ceil(list.length / pagModify.value.pageSize);
}
function paginate(e: any, i: number) {
  if (i == 1) {
    pagQr.value = {
      pageSize: 10,
      pageIndex: e,
    };
  } else if (i == 2) {
    pagSub.value = {
      pageSize: 10,
      pageIndex: e,
    };
  } else if (i == 3) {
    pagModify.value = {
      pageSize: 10,
      pageIndex: e,
    };
  }
}
const myForm = ref();
function edit() {
  myForm.value?.validate().then((val: any) => {
    console.log(val);
    
  if(val.valid){
   if(customerDetailsDto.value.newPassword!==''){
    store.updateCustomer({ ...customerDetailsDto.value, id: props.id ,password:customerDetailsDto.value.newPassword  }).then(() => {
      router.go(-1);
    });
   }
  
  
  else {
    store.updateCustomer({ ...customerDetailsDto.value, id: props.id }).then(() => {
      router.go(-1);
    });
  }
}
  });
}
function delCustomer() {
  if (props && props.id)
    store.deleteCustomer([props.id]).then(() => {
      router.go(-1);
    });
}
function blockEve() {
  if (!customerDetailsDto.value.isBlocked) {
    storeUser.blocked(props.id);
  } else {
    storeUser.unBlocked(props.id);
  }
}

industry.getAllData();
store.GetAllCountry();
store.GetDetailsCustomer(props.id);
</script>
