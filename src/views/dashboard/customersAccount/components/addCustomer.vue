<template>
  <div>
    <Form
      :validation-schema="schema"
      ref="formCustomer"
      class="grid grid-cols-12 gap-5 p-5"
    >
      <div class="md:col-span-6 col-span-12">
        <Field name="name" v-slot="{ field }">
          <v-text-field
            v-bind="field"
            :label="$t('customers.name')"
            v-model="customerDto.name"
          ></v-text-field>
        </Field>
        <ErrorMessage name="name" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="email" v-slot="{ field }">
          <v-text-field
            v-bind="field"
            :label="$t('customers.email')"
            v-model="customerDto.email"
          ></v-text-field>
        </Field>
        <ErrorMessage name="email" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="phoneNumber" v-slot="{ field }">
          <v-text-field
            v-model="customerDto.phoneNumber"
            v-bind="field"
            :label="$t('customers.phoneNumber')"
          ></v-text-field>
        </Field>
        <ErrorMessage name="phoneNumber" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="password" v-slot="{ field }">
          <v-text-field
            :label="$t('customers.password')"
            v-model="customerDto.password"
            v-bind="field"
          ></v-text-field>
        </Field>
        <ErrorMessage name="password" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="company" v-slot="{ field }">
          <v-text-field
            v-bind="field"
            :label="$t('customers.company')"
            v-model="customerDto.company"
          ></v-text-field>
        </Field>
        <ErrorMessage name="company" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="street" v-slot="{ field }">
          <v-text-field
            v-bind="field"
            :label="$t('customers.street')"
            v-model="customerDto.street"
          ></v-text-field>
        </Field>
        <ErrorMessage name="street" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="country" v-slot="{ field }">
          <v-select
            v-bind="field"
            :label="$t('customers.country')"
            v-model="customerDto.countryId"
            :items="countries"
            item-value="id"
            item-title="country"
          ></v-select>
        </Field>
        <ErrorMessage name="country" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="city" v-slot="{ field }">
          <v-select
            v-bind="field"
            :label="$t('customers.city')"
            v-model="customerDto.cityId"
            :items="countries.find((el) => el.id == customerDto.countryId)?.cities"
            item-value="id"
            item-title="city"
          ></v-select>
        </Field>
        <ErrorMessage name="city" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
          <v-select
            v-if="customerDto.cityId"
            disabled
            :value="countries.find((el) => el.id == customerDto.countryId)?.cities.map((e) => e.zipCode)"
            item-title="zipCode"
            item-value="id"
          ></v-select>
       </div>
      
      <div class="md:col-span-6 col-span-12">
        <Field name="industury" v-slot="{ field }">
          <v-select
            v-bind="field"
            :label="$t('customers.industries')"
            :items="industries"
            item-title="name"
            item-value="id"
            v-model="customerDto.industryId"
          ></v-select>
        </Field>
        <ErrorMessage name="industury" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
      <div class="md:col-span-6 col-span-12">
        <Field name="website" v-slot="{ field }">
          <v-text-field
            v-bind="field"
            :label="$t('customers.website')"
            v-model="customerDto.website"
          ></v-text-field>
        </Field>
        <ErrorMessage name="website" v-slot="{ message }"
          ><span class="text-danger text-sm">{{ message }}</span></ErrorMessage
        >
      </div>
    </Form>
    <div class="p-5 pt-0 relative">
      <v-btn variant="flat" @click="saveCustomer">
        <SmallLoading v-if="isLoading" class="absolute top-3"></SmallLoading>
        <span v-else>{{ $t("customers.save") }}</span>
      </v-btn>
      <v-btn variant="tonal" class="mx-4" @click="closeDialog">
        {{ $t("customers.back") }}
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, computed, watch, ref, defineEmits } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import SmallLoading from "@/components/smallLoading/index.vue";
import * as yup from "yup";
import { useCustomerStore } from "@/stores/customers";
import { useIndustryStore } from "@/stores/industry";
import type { Customer } from "@/api/dto/customers";
import { i18n } from "@/i18n";
const router = useRouter();
const formCustomer = ref<InstanceType<typeof Form> | null>(null);
const store = useCustomerStore();
const industry = useIndustryStore();
const emit = defineEmits(["closeDialog"]);
const customerDto = computed(() => store.customerDto);
const countries = computed(() => store.countries);
const industries = computed(() => industry.industries);
const isLoading = ref(false);
// const customerDto = reactive<Customer>();
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = computed(() => {
  return yup.object({
    name: yup
      .string()
      .required(i18n.global.t("customers.nameError"))
      .nullable(),
    website: yup
      .string()
      .required(i18n.global.t("customers.nameError"))
      .nullable(),
    email: yup
      .string()
      .required(i18n.global.t("customers.emailError"))
      .email(i18n.global.t("customers.unSupportEmail"))
      .nullable(),
    password: yup.string().required(i18n.global.t("customers.passwordError")),
    city: yup
      .string()
      .required(i18n.global.t("customers.cityError"))
      .nullable(),
    country: yup
      .string()
      .required(i18n.global.t("customers.countryError"))
      .nullable(),
    street: yup
      .string()
      .required(i18n.global.t("customers.streetError"))
      .nullable(),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, i18n.global.t("customers.unSupportPhone"))
      .required(i18n.global.t("customers.phoneNumberError"))
      .nullable(),
    company: yup
      .string()
      .required(i18n.global.t("customers.companyError"))
      .nullable(),
    industury: yup
      .string()
      .required(i18n.global.t("customers.industriesError"))
      .nullable(),
  });
});
industry.getAllData();
store.GetAllCountry();
function saveCustomer() {
  formCustomer.value?.validate().then((valid) => {
    isLoading.value = true;
    if (valid.valid) {
      store.addCustomer(customerDto.value).then(() => {
        emit("closeDialog");
        isLoading.value = false;
        resetForm();
      });
    }
  });
}

function resetForm() {
  customerDto.value.cityId = null;
  customerDto.value.countryId = null;
  customerDto.value.industryId = null;
  customerDto.value.company = "";
  customerDto.value.email = "";
  customerDto.value.street = "";
  customerDto.value.phoneNumber = "";
  customerDto.value.password = "";
  customerDto.value.name = "";
  customerDto.value.website = "";
  formCustomer.value?.resetForm();
}
function closeDialog() {
  emit("closeDialog");
}
// watch(customerDto, (val) => {
//   if (val) {
//     store.setCustomerDto(val);
//   }
// });
</script>
