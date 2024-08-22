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
    <div class="col-12">
      <div class="q-px-sm q-pt-md">
        {{ $t("all.permissions") }}
      </div>
      <div class="q-gutter-none">
        <template :key="'heading' + index" v-for="(item, index) in permissionOptions">
          <div
            class="q-pl-none q-mt-sm"
          >
            <q-checkbox
              @update:model-value="insertAllValues(formData.permissions, item)"
              :model-value="checkAllValues(formData.permissions, item)"
              :label="index"
              :true-value="true"
              :false-value="false"
              size="lg"
              style="font-size:1.3em; font-weight:bold;"
            />
          </div>
          <q-option-group
            inline=""
            class="q-pl-md"
            color="primary"
            :options="item"
            label="Notifications"
            type="checkbox"
            v-model="formData.permissions"
          />
          <q-separator/>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import validations from "src/utils/validations";
import _ from "lodash";

export default {
  components: {},
  setup(props) {
    const $store = useStore()
    const {rules} = validations();
    const formData = computed({
      get: () => $store.state['roles'].formData,
      set: val => {
        $store.commit(`roles/setFormData`, val)
      }
    })
    const permissionOptions = computed({
      get: () => _.groupBy($store.state['permissions'].all, "group"),
      set: val => {
      }
    })

    const checkAllValues = function (checkIn, allValues) {
      var parseValues = _.map(allValues, "id");

      var diff = _.difference(parseValues, checkIn);
      if (diff.length > 0) {
        return false;
      } else {
        return true;
      }
    }
    const insertAllValues = function (checkIn, allValues) {
      console.log('test')
      var parseValues = _.map(allValues, "id");
      var diff = _.difference(parseValues, checkIn);

      if (diff.length > 0) {
        formData.value.permissions = _.union(checkIn, diff);
      } else {
        formData.value.permissions = _.xor(checkIn, parseValues);
      }
    }

    const fetchAllPermissions = () => {
      return $store.dispatch(`permissions/fetchAll`)
    }

    onMounted(() => {
      fetchAllPermissions()
    })
    return {
      formData,
      rules,
      fetchAllPermissions,
      permissionOptions,
      checkAllValues,
      insertAllValues
    }
  }
}
</script>
