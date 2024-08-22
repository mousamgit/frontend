import {ref, computed} from "vue";
import {useStore} from 'vuex'
import {generateOtpToken} from "src/store/auth/actions";

export default function () {
  const $store = useStore()

  const username = computed({
    get: () => $store.state.auth.modelData.username,
    set: val => {
      $store.commit('auth/setUsername', val)
    }
  })
  const password = computed({
    get: () => $store.state.auth.modelData.password,
    set: val => {
      $store.commit('auth/setPassword', val)
    }
  })


  const token = computed({
    get: () => $store.state.auth.modelData.token,
    set: val => {
      $store.commit('auth/setToken', val)
    }
  })

  const otpPage = computed({
    get: () => $store.state.auth.otpPage,
    set: val => {
      $store.commit('auth/setOtpPage', val)
    }
  })

  const submitLogin = (data) => {
    return $store.dispatch('auth/submitLogin',data)
  }

  const verifyOtpTokenSubmit = (data) => {
    return $store.dispatch('auth/verifyOtpTokenSubmit',data)
  }

  return {
    username,
    password,
    token,
    otpPage,
    submitLogin,
    verifyOtpTokenSubmit
  }
}
