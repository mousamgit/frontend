<template>
  <div class="row q-col-gutter-xs">
    <div class="col-12">
      <q-input
        :label="$t('all.name') + ' *'"
        :rules="[rules.required]"
        bordered
        lazy-rules
        outlined
        type="text"
        v-model="formData.name"
      >

      </q-input>
    </div>
  </div>
</template>
<script>
import {useStore} from "vuex";
import {computed} from "vue";
import validations from "src/utils/validations";

export default {
  components: {
  },
  setup(props) {
    const $store = useStore()
    const {rules} = validations();
    const formData = computed({
      get: () => $store.state['permissions'].formData,
      set: val => {
        $store.commit(`permissions/setFormData`, val)
      }
    })

    return {
      formData,
      rules
    }
  }
}
</script>
