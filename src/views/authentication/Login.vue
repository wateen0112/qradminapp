<template>
  <div>
    <div class="login bg-white dark:bg-gray-900  w-full  ">
      <div class="flex h-screen">
        <div class="flex lg:pr-14   bg-gray-100 flex-col justify-center pt-20 items-center  lg:block lg:w-4/6" id="_center">
          <img src="/media/svg/login.svg" class="lg:block hidden max-h-[500px]" alt="" srcset="" />
        </div>
        <div class="flex items-center w-full max-w-md px-9 mx-auto lg:w-4/6">
          <div class="flex items-center flex-col w-full">
            <div class="d-flex items-center mt-2 w-full" id="_center">
              <div class="flex items-center lg:ml-20">
                <div class="items-center">
                  <div class="text-center">
                
                    <h6
                    class="mb-2 mt text-3xl   text-gray-600 dark:text-primary text-end text-[22px]"
                  >
                    <span>   👋👋👋 Welcome </span>
                  
                  </h6>
             
                  <h6
                  class="mb-4 mt text-3xl   text-gray-600 dark:text-primary text-end text-[22px]"
                >
                  <span> To Start login </span>
                
                </h6>

                    <Form :validation-schema="schema">
                      <v-row>
                        <v-col cols="12">
                          <Field
                            class="text-center"
                            name="email"
                            v-slot="{ field }"
                            v-model="loginForm.email"
                          >
                            <v-text-field
                              prepend-icon="mdi-account"
                              v-bind="field"
                              variant="underlined"
                              :label="$t('login.email')"
                            >
                            </v-text-field>
                          </Field>
                          <ErrorMessage
                            class="mt-2"
                            name="email"
                            v-slot="{ message }"
                            ><span class="text-danger text-sm flex">{{
                              message
                            }}</span></ErrorMessage
                          >
                        </v-col>

                        <v-col cols="12">
                          <Field
                            name="password"
                            v-slot="{ field }"
                            v-model="loginForm.password"
                          >
                            <v-text-field
                              v-bind="field"
                              prepend-icon="mdi-key"
                              variant="underlined"
                              :label="$t('login.password')"
                            >
                            </v-text-field>
                          </Field>
                          <ErrorMessage
                            class="mt-2"
                            name="password"
                            v-slot="{ message }"
                            ><span class="text-danger text-sm flex">{{
                              message
                            }}</span></ErrorMessage
                          >
                        </v-col>

                        <v-btn class="w-100 h-7" @click="submit()">{{
                          $t("login.login")
                        }}</v-btn>
                      </v-row>
                      <v-row class="mt-5 text-end w-full text-gray-400">   <router-link to="forgetPassword">{{$t('forgetPassword.title')}}</router-link></v-row>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../../stores/Auth";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive, computed } from "vue";
// import router from "@/router";
import * as yup from "yup";
import { i18n } from "@/i18n";
const { Login } = useAuthStore();
const schema = computed(() => {
  return yup.object({
    email: yup
      .string()
      .required(i18n.global.t("login.emailError"))
      .email(i18n.global.t("login.unSupportEmail"))
      .nullable(),
    password: yup.string().required(i18n.global.t("login.passwordError")),
  });
});
const loginForm = reactive({
  email: "",
  password: "",
});

function submit() {
  Login(loginForm);
}
</script>
<style lang="scss" scoped>
.login {
  z-index: 10000;
}
img {
  width: 90%;
  height: 100vh;
}
#_center {
  justify-content: center !important;
}
</style>
