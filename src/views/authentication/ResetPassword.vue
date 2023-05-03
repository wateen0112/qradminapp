<template>
    <section class="password">
      <div class="relative">
        <div class="ml-0">
          <img class="absolute top-0 left-0" src="@/assets/svg/logo.svg" alt="" srcset="" />
        </div>
        <div class="absolute top-0 left-0" >
     
        </div>
      </div>
  
      <div class="grid grid-cols-12 h-screen w-screen">
        <div
          class="relative lg:col-span-5 col-span-12 hidden lg:flex justify-center items-center h-full"
        >
          <div class="image-password  w-0.5">
         
          </div>
          <div class="image-thinking absolute" style="right: 10px">
           
          </div>
          <div class="image-question absolute" style="right: 10px; top: 11rem">
   
          </div>
        </div>
        <div
          class="relative lg:col-span-7   col-span-12 text-gray-500 flex flex-col justify-center items-center h-full w-full"
        >
          <nuxt-link
            class="absolute top-5 left-5 cursor-pointer"
        
            to="/"
          >
       
          </nuxt-link>
          <div
            class="md:px-28 px-5 w-full flex justify-start items-start flex-col mb-10"
          >
            <h2 class="text-5xl text-gray-500 mb-5">{{$t('forgetPassword.resetPassword')}}</h2>
  
            <p class="text-xl text-gray-500 pl-20">
              {{$t('forgetPassword.resetMsg')}} {{email}} 
            </p>
          </div>

          <Form
            ref="forgetPassword"
            :validation-schema="schema"
            class="w-[90%] lg:ml-28 px-5"
          >
       
            <div class="mb-6">
                <!-- {{ auth.email }} -->
                <Field name="code" v-slot="{ field }">
                  <v-text-field
                v-model="code"
                    v-bind="field"
                    :label="$t('forgetPassword.code')"
                    variant="underlined"
                    prepend-inner-icon="mdi-lock"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="code" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>
              <div class="mb-6">
                <!-- {{ auth.email }} -->
                <Field name="password" v-slot="{ field }">
                  <v-text-field
                v-model="password"
                    v-bind="field"
                    :label="$t('forgetPassword.newPassword')"
                    variant="underlined"
                    prepend-inner-icon="mdi-lock"
                  ></v-text-field>
                </Field>
                <ErrorMessage name="password" v-slot="{ message }">
                  <span class="text-red-lighten-1">{{ message }}</span>
                </ErrorMessage>
              </div>

  
            <!-- Submit button -->
            <div
              class="w-full flex-col flex justify-center items-center"
            >
              <v-btn
                @click="onSubmit"
                color="primary"
                class="mt-5 text-white px-10 py-2 rounded-pill"
              >
                {{$t('forgetPassword.code')}}
              </v-btn>
              <div class="mt-5">
                <nuxt-link
                  to="/login"
                  class="decoration-danger  cursor-pointer underline text-danger-500"
                  >     {{$t('forgetPassword.return')}}</nuxt-link
                >
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  </template>
  <script setup lang="ts">
  import {computed , ref,onMounted} from 'vue';
  import router from "@/router";
  import {i18n} from '@/i18n';
  import { Form, ErrorMessage, Field } from "vee-validate";
  import * as yup from "yup";
  import { storeToRefs } from 'pinia';
import {useAuthStore} from '@/stores/Auth';
import { eachMonthOfInterval } from 'date-fns';
const store = useAuthStore();
const {email} = storeToRefs(store)
const code = ref('');

const password = ref('')
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  // const email = ref("");
//   const auth = computed(() => store.authDto);
  const forgetPassword = ref<InstanceType<typeof Form> | null>(null);
  const schema = computed(() => {
    return yup.object({
   
      code: yup.string().matches(phoneRegExp).required(i18n.global.t('forgetPassword.requiredCode')).nullable(),
      password: yup.string().min(4).max(20).required((i18n.global.t('forgetPassword.requiredPassword'))),
    });
  });
  function onSubmit() {
    forgetPassword.value?.validate().then((valid) => {
      if (valid.valid) {
        // store.forgetPassword({ email: email.value}).then(() => {});

        
        store.resetPassword({
          email:email.value,
          NewPassword:password.value,
          code:code.value
        });
      }
      else {
        console.log('invalid')
      }
    });

  }
 
onMounted(() => {
  if(email.value ===''){
router.push('/login')
  }
}),
console.log('my props are :',email.value);

  </script>
  <style lang="scss">
  .password {
    .image-password {
      width: 40% !important;
    }
    .image-thinking {
      right: 20px;
    }
    .image-question {
      right: 20px;
    }
  }
  </style>
  