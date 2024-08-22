import {ref, computed} from "vue";
import {useStore} from 'vuex'

export default function () {
  const $store = useStore()


  const validationErrors = computed({
    get: () => $store.state.validationErrors.errors,
    set: val => {
      $store.commit('validationErrors/setErrors', val)
    }
  })
  return {
    validationErrors
  }
}
