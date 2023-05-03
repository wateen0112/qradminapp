<template>
    <section class="password">
      <div class="relative">
        <div class="ml-0">
          <img class="absolute top-0 left-0" src="@/assets/svg/logo.svg" alt="" srcset="" />
        </div>
        <div class="absolute top-0 left-0" >
          <img class="" src="@/assets/svg/qr.svg" alt="" srcset="" />
        </div>
      </div>
  
      <div class="grid grid-cols-12 h-screen w-screen">
        <div
          class="relative lg:col-span-5 col-span-12 hidden lg:flex justify-center items-center h-full"
        >
          <div class="image-password  w-0.5">
            <img
              class="w-full "
              src="@/assets/svg/register/mobile-password.svg"
              alt="Phone image"
            />
          </div>
          <div class="image-thinking absolute" style="right: 10px">
            <img
              class="w-24"
              src="@/assets/svg/register/thinking.svg"
              alt="Phone image"
            />
          </div>
          <div class="image-question absolute" style="right: 10px; top: 11rem">
            <img
              class="w-24"
              src="@/assets/svg/register/question-marks.svg"
              alt="Phone image"
            />
          </div>
        </div>
        <div
          class="relative lg:col-span-7   col-span-12 text-gray-500 flex flex-col justify-center items-center h-full w-full"
        >
          <nuxt-link
            class="absolute top-5 left-5 cursor-pointer"
        
            to="/"
          >
            <img src="@/assets/svg/arrowBlack.svg" alt="" srcset="" />
          </nuxt-link>
          <div
            class="md:px-28 px-5 w-full flex justify-start items-start flex-col mb-10"
          >
            <h2 class="text-5xl text-gray-500 mb-5">{{$t('forgetPassword.title')}}</h2>
  
            <p class="text-xl text-gray-500">
           {{$t('forgetPassword.content')}}
            </p>
          </div>
  
          <Form
            ref="forgetPassword"
            :validation-schema="schema"
            class="w-[90%] lg:ml-28 px-5"
          >
            <!-- Email input -->
            <div class="mb-6">
              <!-- {{ auth.email }} -->
              <Field name="email" v-slot="{ field }">
                <v-text-field
              v-model="email"
                  v-bind="field"
                  :label="$t('forgetPassword.email')"
                  variant="underlined"
                  prepend-inner-icon="mdi-email-outline"
                ></v-text-field>
              </Field>
              <ErrorMessage name="email" v-slot="{ message }">
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
                {{$t('forgetPassword.send')}}
              </v-btn>
              <div class="mt-5">
                <nuxt-link
                  to="/login"
                  class="decoration-danger  cursor-pointer underline text-danger-500"
                  >   {{$t('forgetPassword.return')}}</nuxt-link
                >
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  </template>
  <script setup lang="ts">
import {i18n} from '@/i18n';
  import {computed , ref} from 'vue';
  import { Form, ErrorMessage, Field } from "vee-validate";
  import * as yup from "yup";
import {useAuthStore} from '@/stores/Auth';
import { eachMonthOfInterval } from 'date-fns';
const store = useAuthStore();
const email = ref('');
  // const email = ref("");
//   const auth = computed(() => store.authDto);
  const forgetPassword = ref<InstanceType<typeof Form> | null>(null);
  const schema = computed(() => {
    return yup.object({
      email: yup.string().required(i18n.global.t('forgetPassword.required')).email(i18n.global.t('forgetPassword.invalidEmail')),
    });
  });
  function onSubmit() {
    forgetPassword.value?.validate().then((valid) => {
      if (valid.valid) {
        store.forgetPassword({ email: email.value}).then(() => {});
      }
    });
  if(forgetPassword){
    console.log(   'Forget passwrod  . . . ',forgetPassword);
    
  }
  }
;
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
  