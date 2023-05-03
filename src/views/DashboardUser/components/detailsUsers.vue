<template>
  <div   class="d-flex flex justify-space-between ml-5" >
  
      <h1 class="mb-2 font-semibold">تفاصيل المستخدم</h1>
      <!-- <v-icon >mdi-close</v-icon> -->
  </div>
   
    <div class="p-3 px-2 text-gray-400 text-sm">
      <Field v-slot="{ field }" name="name">
        <v-text-field
          :v-bind="field"
          placeholder="الاسم "
          v-model="dto.name"
          label="الاسم "
        ></v-text-field>
      </Field>
      <ErrorMessage name="name" class="text-danger text-sm pt-1">
      </ErrorMessage>
    </div>
    <div class="p-3 px-2 text-gray-400 text-sm">
      <Field v-slot="{ field }" name="email">
        <v-text-field
          :v-bind="field"
          v-model="dto.email"
          placeholder="البريد الالكتروني"
          label="البريد الالكتروني"
        ></v-text-field>
      </Field>
      <ErrorMessage
        name="email"
        class="text-danger text-sm pt-1"
      ></ErrorMessage>
    </div>
    <div class="p-3 px-2 text-gray-400 text-sm">
      <Field v-slot="{ field }" name="password">
        <v-text-field
          v-model="dto.password"
          :v-bind="field"
          placeholder="كلمة السر"
          label="كلمة السر"
        ></v-text-field>
      </Field>
      <ErrorMessage
        name="password"
        class="text-danger text-sm pt-1"
      ></ErrorMessage>
    </div>
    <div class="p-3 px-2 text-gray-400 text-sm">
      <!-- <div
              v-for="(itemPhone, i) in UserDto.phoneNumber"
              :key="i"
              :class="UserDto.phoneNumber[i + 1] ? 'mt-4' : ''"
            >
              <v-btn
                @click="addPhone(UserDto.phoneNumber)"
                id="add"
                class="left-3 position-absolute"
                size="x-small"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                @click="removePhone(UserDto.phoneNumber, i)"
                id="add"
                class="left-14 position-absolute"
                size="x-small"
              >
                <v-icon>mdi-trash-can-outline</v-icon>
                :id="'phoneNumbers' + i"
              </v-btn> -->
      <Field name="phoneNumber" v-slot="{ field }">
        <v-text-field
          :v-bind="field"
          placeholder="رقم الموبايل"
          v-model="dto.phoneNumber"
          label="رقم الموبايل"
        ></v-text-field>
      </Field>
      <ErrorMessage name="phoneNumber" class="text-danger text-sm py-2">
      </ErrorMessage>
    </div>
    <div class="p-3 px-2 text-gray-400 text-sm">
      <Field v-slot="{ field }" name="birthday">
        <Datepicker
          :v-bind="field"
          label="تاريخ الميلاد"
          v-model="dto.birthDate"
          placeholder="تاريخ الميلاد"
          class="shadow"
          solo
        ></Datepicker>
      </Field>
      <ErrorMessage
        name="birthday"
        class="text-danger text-sm pt-1"
      ></ErrorMessage>
    </div>
    <div class="p-3 px-2 text-gray-400 text-sm">
      <Field v-slot="{ field }" name="role">
        <v-text-field
          :v-bind="field"
          v-model="dto.role"
          label="Role"
        ></v-text-field>
      </Field>
      <ErrorMessage name="role" class="text-danger text-sm pt-1"></ErrorMessage>
    </div>


  
</template>
<script setup lang="ts">
import { defineProps, ref, computed, reactive } from "vue";
import { useUserStore } from "@/stores/DashUser";
import Datepicker from "@vuepic/vue-datepicker";
import { Field, Form, ErrorMessage } from "vee-validate";
import "@vuepic/vue-datepicker/dist/main.css";
import { storeToRefs } from "pinia";
// import type { AddUsers } from "../../../models/dto/UserDto";
const store = useUserStore();
const isActive = ref(false);
const props = defineProps({
  id: { type: String, default: "0" },
});

const UserDto = computed(() => store.UserDto);

const dto = computed(() => {
  return {
    id: UserDto.value?.id,
    name: UserDto.value?.name ?? "",
    phoneNumber: UserDto.value?.phoneNumber ?? "",
    email: UserDto.value?.email ?? "",
    password: UserDto.value?.password ?? "",
    birthDate: UserDto.value?.birthDate ?? "",
    role: UserDto.value?.role ?? "",
  };
});
const modify = () => {
  // console.log("object to be modified  : ", Dto.value);
  store.Modify(dto.value);
  store.getUsers();
};
// console.log("my users", Dto.value);
</script>
<style lang="scss">
.dp__main.dp__theme_light.shadow {
  border-radius: 5px;
  .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
    padding: 14.5px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-color: #e5e7eb;
    &::placeholder {
      padding-left: 20px;
      // justify-content: space-between;
    }
  }
}
</style>
