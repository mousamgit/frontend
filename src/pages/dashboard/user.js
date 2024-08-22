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
  const logo = require('https://pim.samsgroup.info/sga-pim-redwhite-horizontal.png')
  const $router = useRouter();
  return {
    currentUser,
    logo,
  }
}
