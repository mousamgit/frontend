<template>
  <q-page>
    <div class="login-view registration-view layout-padding">
      <div class="left-side">
      </div>
      <q-card flat class="bg-white card no-border-radius" inline style="max-width:385px;">
        <q-card-section class="registration-header q-pa-none">
          <div class="column">
            <div class="logo-brand">
              <div class="logo" >
                <img class="logo-image" style="background:none;" alt="SGA PIM Logo" :src="logo" width="70px" />
              </div>
              <div class="text-h6 text-white">
              PIM ORDER LOGIN 
              </div>

              <div class="reg-top-section q-mt-lg">
                <div class="text-h6 text-white">
                  Enter your email and password below
                </div>
                <!--                <p class="text-white">-->
                <!--                  A six digit code will be sent to your mobile number.-->
                <!--                </p>-->
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 225">
            <path
              fill="#ffffff"
              fill-opacity="1"
              d="M0,64L34.3,53.3C68.6,43,137,21,206,58.7C274.3,96,343,192,411,213.3C480,235,549,181,617,165.3C685.7,149,754,171,823,160C891.4,149,960,107,1029,101.3C1097.1,96,1166,128,1234,133.3C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
        </q-card-section>
        <q-card-section class="q-pa-lg">
          <!--          <p class="text-center registration-info">-->
          <!--            To proceed and start using the Sociair App, user must enter a valid mobile number.-->
          <!--          </p>-->
          <transition
            appear
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutLeft"
            :duration="{ enter: 1000, leave: 100 }"
            mode="out-in"

          >
            <div key="login-form" v-if="!otpPage">
              <q-form ref="regFormRef" class="row">
                <div class="col-12">
                  <errors-list/>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="username"
                    bordered
                    color="primary"
                    lazy-rules
                    outlined
                    :label="this.$t('label.email')"
                    :rules="[value => !!value || this.$t('validation.required')]"
                    autofocus
                  >
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="password"
                    bordered
                    color="primary"
                    lazy-rules
                    :type="showPassword ? 'text' : 'password'"
                    outlined
                    :label="this.$t('label.password')"
                    :rules="[value => !!value || this.$t('validation.required')]"
                    autofocus
                  >
                    <template v-slot:append>
                      <q-icon @click="showPassword=!showPassword" class="cursor-pointer" :name="showPassword ? 'mdi-eye-off':'mdi-eye'" color="primary"/>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 q-mt-lg">
                  <q-btn
                    stretch
                    class="full-width"
                    color="primary"
                    no-caps
                    type="submit"
                    @click.prevent="login"
                    :loading="submitting"
                  >
                    {{ $t("label.login") }}
                  </q-btn>
                </div>
                <div class="col-12 q-mt-lg text-center text-primary">
                  OR
                </div>
                <div class="col-12 q-mt-lg">
                  <div class="row q-col-gutter-sm">
                    <div class="col-12">
                      <q-btn
                        unelevated
                        no-caps
                        color="blue-1"
                        class="full-width text-weight-normal"
                        text-color="primary"
                        @click="alreadyHaveAToken"
                        :loading="submitting"
                      >
                        {{ $t("label.reset_password") }}
                      </q-btn>
                    </div>
                    <!--                    <div class="col-2 flex flex-center">-->
                    <!--                      <q-btn no-caps unelevated color="grey-3" text-color="facebook" icon="mdi-facebook"/>-->
                    <!--                    </div>-->
                    <!--                    <div class="col-2 flex flex-center">-->
                    <!--                      <q-btn no-caps unelevated color="grey-3" text-color="twitter" icon="mdi-twitter"/>-->
                    <!--                    </div>-->
                  </div>
                </div>

              </q-form>
            </div>
            <div key="token-verify" v-else>
              <token_verify_page/>
            </div>
          </transition>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import token_verify_page from './token_verify_page.vue'
import loginData from "./loginData.js";
import ErrorsList from "pages/errors/errors.vue";
import errors from "pages/errors/errors";
import {useRouter} from "vue-router";
import logo from 'src/assets/icons/icon.png';

export default defineComponent({
  name: 'LoginPage',
  components: {
    ErrorsList,
    token_verify_page
  },
  setup() {
    const regFormRef = ref(null)
    const {username, password, otpPage, submitLogin} = loginData();
    const {validationErrors} = errors();
    const submitting = ref(false)
    const showPassword = ref(false)
    const $router = useRouter();
   

    const login = (evt) => {
      validationErrors.value = null
      regFormRef.value.validate().then((success) => {
        if (success) {
          // otpPage.value = true;
          submitting.value = true;
          submitLogin({username: username.value,password: password.value}).then(res => {
            let redirection = "/dashboard"; // Default route
            $router.replace(redirection);
          }).finally(f => {
            submitting.value = false;
          }).catch(err => {
            console.log(err)
          })
        }
      });
    };

    const alreadyHaveAToken = (evt) => {
      regFormRef.value.validate().then((success) => {
        if (success) {
          otpPage.value = true;
        }
      });
    };

    return {
      logo,
      otp: require("assets/icons/one-time-password.svg"),
      username,
      password,
      submitLogin,
      submitting,
      otpPage,
      login,
      alreadyHaveAToken,
      regFormRef,
      showPassword
    }
  }
})
</script>
