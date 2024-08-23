import {ref, computed} from "vue";
import {useStore} from 'vuex'
import {LocalStorage} from "quasar";
import {api} from "boot/axios";
import {useRouter, useRoute} from "vue-router";
import {useQuasar} from 'quasar'

export default function () {
  const $store = useStore()
  const $q = useQuasar()
  const currentUser = computed({
    get: () => $store.state.auth.currentUser,
    set: val => {
      $store.commit('auth/setCurrentUser', val)
    }
  })
  const logo = require('src/assets/icons/icon.png')
  const $router = useRouter();
  return {
    currentUser,
    logo,
  }
}
