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
        <template v-slot:prepend>
          <q-icon name="mdi-face-man"/>
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <q-input
        :label="$t('all.email') + ' *'"
        :rules="rules.email"
        bordered
        lazy-rules
        outlined
        type="email"
        v-model="formData.email"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email-outline"/>
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <q-select
        :label="$t('all.role') + ' *'"
        :rules="[rules.required]"
        bordered
        lazy-rules
        outlined
        v-model="formData.role"
        :options="rolesOptions"
        map-options
        emit-value
        option-label="name"
        option-value="id"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-shield-outline"/>
        </template>
      </q-select>
    </div>
    <div class="col-6">
      <password-input
        :id="'password'"
        v-model="formData.password"
        :label="$t('all.password') + ''"
        :required="false"
        :rules="[]"
      />
    </div>
    <div class="col-6">
      <password-input
        :id="'confirm_password'"
        v-model="formData.confirm_password"
        :label="$t('all.confirm_password') + ''"
        :required="false"
        :rules="[]"
      />
    </div>
  </div>
</template>
<script>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import validations from "src/utils/validations";
import PasswordInput from "components/Fields/PasswordInput";

export default {
  components: {
    PasswordInput
  },
  setup(props) {
    const $store = useStore()
    const {rules} = validations();
    const formData = computed({
      get: () => $store.state['users'].formData,
      set: val => {
        $store.commit(`users/setFormData`, val)
      }
    })
    const rolesOptions = computed({
      get: () => $store.state['roles'].all,
      set: val => {
      }
    })
    const fetchAllRoles = () => {
      return $store.dispatch(`roles/fetchAll`)
    }
    onMounted(() => {
      fetchAllRoles()
    })
    return {
      formData,
      rules,
      rolesOptions
    }
  }
}
</script>
