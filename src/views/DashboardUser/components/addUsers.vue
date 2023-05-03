<template>
  <div>
    <Form  :initialValues="UserDto" :validation-schema="schema"    class="grid grid-cols-12 gap-5 p-5">
  
       
            <div class="md:col-span-6 col-span-12">
              <Field v-slot="{ field }" name="name">
                <v-text-field
                  v-bind="field"
                  placeholder="الاسم "
                  label="الاسم "
                  v-model="UserDto.name"
                ></v-text-field>
              </Field>
              <ErrorMessage name="name" class="text-danger text-sm pt-1">
              </ErrorMessage>
       </div>
       
          
             <div class="md:col-span-6 col-span-12">
              <Field v-slot="{ field }" name="email">
                <v-text-field
                  v-model="UserDto.email"
                  v-bind="field"
                  placeholder="البريد الالكتروني"
                  label="البريد الالكتروني"
                ></v-text-field>
              </Field>
              <ErrorMessage
                name="email"
                class="text-danger text-sm pt-1"
              ></ErrorMessage>
       </div>
      
          
             <div class="md:col-span-6 col-span-12">
              <Field v-slot="{ field }" name="password">
                <v-text-field
                  v-model="UserDto.password"
                  v-bind="field"
                  label="كلمة السر"
                ></v-text-field>
              </Field>
              <ErrorMessage
                name="password"
                class="text-danger text-sm pt-1"
              ></ErrorMessage>
       </div>
      
        
              <div class="md:col-span-6 col-span-12">
              <Field v-slot="{ field }" name="phoneNumber">
                <v-text-field
                  v-model="UserDto.phoneNumber"
                  v-bind="field"
                  label=" أدخل رقم التلفون "
                ></v-text-field>
              </Field>
              <ErrorMessage
                name="phoneNumber"
                class="text-danger text-sm pt-1"
              ></ErrorMessage>
       </div>
      
          
             <div class="md:col-span-6 col-span-12">
              <Field v-slot="{ field }" name="birthday">
                <Datepicker
                  format="dd/MM/yyyy"
                  v-bind="field"
                  label="تاريخ الميلاد"
                  placeholder="تاريخ الميلاد"
                  v-model="UserDto.birthDate"
                  class="shadow"
                  solo
                ></Datepicker>
              </Field>
              <ErrorMessage
                name="birthday"
                class="text-danger text-sm pt-1"
              ></ErrorMessage>
       </div>
      
             <div class="md:col-span-6 col-span-12">
              <Field v-slot="{ field }" name="role">
                <v-select
                  :items="items"
                  v-bind="field"
                  v-model="UserDto.role"
                  label="الصلاحيات"
                  solo
                ></v-select>
              </Field>
              <ErrorMessage
                name="role"
                class="text-danger text-sm pt-1"
              ></ErrorMessage>
      </div>
    </Form>
    <div class="d-flex">
      <div v-if="isUpdate">
        <v-btn id="v-btn" variant="flat" @click="modify"> {{
          $t("customers.edit")
        }} </v-btn>
        <v-btn
          id="v-btn"
          v-if="UserDto.isBlocked === false"
          variant="flat"
          @click="blockUser"
        >
        {{   $t("customers.block") }}
        </v-btn>
        <v-btn v-else id="v-btn" variant="flat" @click="UnBlockUser">
        {{$t("customers.unBlock")}}
        </v-btn>
      </div>
      <v-btn id="v-btn" v-else variant="flat" @click="myFunction">
      {{ $t("customers.save") }}
      </v-btn>
      <v-btn id="v-btn" variant="tonal" class="mx-4" @click="closeDialog">  {{ $t("customers.back") }} </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed } from "vue";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
import type { User } from "../../../models/dto/UserDto";
import { useUserStore } from "@/stores/DashUser";
import { storeToRefs } from "pinia";
const emit = defineEmits(["closeDialog"]);
const store = useUserStore();
const { UserDto } = storeToRefs(store);
// const UserDto = computed(() => store.UserDto);
function closeDialog() {
  emit("closeDialog");
}
function myFunction() {
  store.addUsers(UserDto.value).then(() => {
    emit("closeDialog");
  });
  store.getUsers();
}
store.getUsers();

const isUpdate = computed(() => !!UserDto.value.id);

const modify = () => {
  store.Modify(UserDto.value);
  store.getUsers();
};

const blockUser = () => {
  store.blockUser(UserDto.value.id);
  store.getUsers();
};

const UnBlockUser = () => {
  store.UnBlockUser(UserDto.value.id).then(() => {
    emit("closeDialog");
    store.getUsers()
  });
};
const items = ["Admin", "superAdmin"];

// function Blocked(user: User) {
//   store.$patch({
//     User: {
//       isBlocked: user.isBlocked ?? true,
//     },
//   });
//   console.log(store.$patch({ User: { isBlocked: user.isBlocked } }));
// }
const phoneRegExp =
  /^((\\[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object({
  name: yup.string().required("الاسم مطلوب"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "رقم الموبايل غير صالح")
    .required("رقم الموبايل مطلوب"),

  password: yup.string().required("كلمة السر مطلوبة"),
  email: yup
    .string()
    .required("البريد الكتروني مطلوب")
    .email("يجب ادخال بريد الكتروني صالح"),
  birthday: yup.string().required(" تاريخ الميلاد مطلوب"),
  role: yup.string().required(" يجب تحديد الصلاحية"),
});
</script>
<style lang="scss">
.v-input__details {
  display: none;
}
button#add {
  top: -14px;
}
.dp__main.dp__theme_light.shadow {
  border-radius: 5px;
  .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
    padding: 14.5px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-color: #e5e7eb;
    &::placeholder {
      padding-left: 20px;
    }
  }
}
#v-btn {
  width: 120px;
  height: 50px;
  margin: 5px;
  font-weight: bold;
  // font-size: 17px;
  color: rgb(252, 250, 250);
}
</style>
