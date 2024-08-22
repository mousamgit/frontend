<template>
  <q-form ref="tokenVerifyFormRef" class="row">
    <div class="col-12">
      <q-input
        id="email"
        v-model="mobileNumber"
        mask="##########"
        bordered
        color="primary"
        outlined
        :label="this.$t('label.mobile_number')"
        :rules="[rules.required]"
        autofocus
        readonly
      >
        <template v-slot:prepend>
          <q-icon :name="'img:' + otp"/>
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <div style="display: flex;gap: 10px; justify-content: center;align-content: center;align-items: center;">
        <Vue3OtpInput
          ref="token"
          input-classes="otp-input"
          separator=""
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-complete="verifyToken"
        />
      </div>
      <!--      <q-input-->
      <!--        v-model="token"-->
      <!--        bordered-->
      <!--        mask="######"-->
      <!--        color="primary"-->
      <!--        outlined-->
      <!--        hide-bottom-space-->

      <!--        :loading="submitting"-->
      <!--        :label="this.$t('label.token')"-->
      <!--        :rules="[]"-->
      <!--      >-->
      <!--        <template v-slot:prepend>-->
      <!--          <q-icon :name="'img:' + tokenSvg" />-->
      <!--        </template>-->
      <!--      </q-input>-->
    </div>
    <div class="col-12 text-center" v-if="countdown <= 0">
      <div class="q-mt-lg justify-center">
            <span class="text-grey-9">
              Haven't receive a code?
            </span>
        <a
          @click="resendToken"
          class="text-center cursor-pointer"
          style="text-decoration: none;color: #105fa4;font-size: 14px;letter-spacing: 0.04em;"
        >{{ $t("label.resend") }}</a
        >
      </div>
    </div>
    <div class="col-12 text-center" v-else>
      <div class="q-mt-lg justify-center">
            <span class="text-grey-9">
             {{ 'Wait for ' + countdown + ' seconds to resend the code' }}
            </span>
      </div>
    </div>
    <div class="col-12 q-mt-lg">
      <div class="row q-col-gutter-sm">
        <div class="col-3">
          <q-btn
            stretch
            class="full-width"
            color="grey-2"
            unelevated
            text-color="grey-8"
            icon="mdi-arrow-left"
            @click="otpPage=false"
            :disable="submitting"
          >

          </q-btn>
        </div>
        <div class="col-9">
          <q-btn
            stretch
            class="full-width"
            color="blue-8"
            type="submit"
            @click.prevent="verifyToken"
            :loading="submitting"
            :disable="submitting"
          >
            {{ $t("label.proceed") }}
          </q-btn>
        </div>
      </div>
    </div>

    <!--    <div class="col-12 text-center">-->
    <!--      <div class="q-mt-lg justify-center">-->
    <!--        <a-->
    <!--          @click="$router.push({ name: 'Home' })"-->
    <!--          class="text-center cursor-pointer"-->
    <!--          style="text-decoration: none;color: #105fa4;font-size: 14px;letter-spacing: 0.04em;"-->
    <!--        >{{ $t("label.go_to_home") }}</a-->
    <!--        >-->
    <!--      </div>-->
    <!--    </div>-->
  </q-form>
</template>
<style>
.otp-input {
  width: 45px;
  height: 45px;
  padding: 5px;
  margin: 0 6px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  background: #2374e11c;
}
</style>
<script>
import validations from "../../utils/validations.js";
import {mapActions, mapGetters} from "vuex";
import {LocalStorage} from "quasar";
import {api} from "boot/axios";
import {defineComponent, ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import loginData from "./loginData.js";
import Vue3OtpInput from '../../components/Otp/vue3-otp-input';
import errors from "pages/errors/errors";

export default defineComponent({
  name: 'LoginPage',
  components: {
    Vue3OtpInput
  },
  setup() {
    const $router = useRouter();
    const {rules} = validations();
    const {mobileNumber, token, otpPage, generateOtpTokenSubmit, verifyOtpTokenSubmit} = loginData();
    const countdown = ref(60);
    const resending = ref(false);
    const {validationErrors} = errors();
    const onOtpChange = function (val) {
      this.token = val
    }
    const resendToken = (evt) => {
      validationErrors.value = null
      resending.value = true;
      generateOtpTokenSubmit({mobileNumber: mobileNumber.value}).then(res => {
        countdown.value = 60
      }).finally(f => {
        resending.value = false;
      })
    };

    const tokenVerifyFormRef = ref(null);
    const submitting = ref(false);

    const verifyToken = function (value) {

      tokenVerifyFormRef.value.validate().then((success) => {
        if (success) {
          // otpPage.value = true;
          submitting.value = true;
          verifyOtpTokenSubmit({mobileNumber: mobileNumber.value, token:token.value.otp.join('')}).then(res => {
            let redirection = "/dashboard"; // Default route
            $router.replace(redirection);
          }).finally(f => {
            submitting.value = false;
          }).catch(errors => {
            console.log(errors)
          })
        }
      });
    }
    onMounted(() => {
      setInterval(() => {
        countdown.value--
      }, 1000);
    })
    return {
      rules,
      validationErrors,
      generateOtpTokenSubmit,
      mobileNumber,
      submitting,
      otp: require("assets/icons/one-time-password.svg"),
      tokenSvg: require("assets/icons/token.svg"),
      token,
      sms: require("assets/icons/sms.svg"),
      countdown,
      verifyToken,
      otpPage,
      onOtpChange,
      resendToken,
      tokenVerifyFormRef,
      verifyOtpTokenSubmit
    };
  },
});
</script>
