<template>
  <q-dialog
    persistent
    v-model="formDialog"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">
          <slot name="title">
            {{ $t(`all.${storeModel}`) }}
          </slot>
          <q-btn flat v-close-popup icon="mdi-close" class="float-right"/>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @keydown.enter.prevent="submitForm" ref="formRef">
          <div class="row">
            <div class="col">
              <validation-errors :errors="errors"></validation-errors>
            </div>
          </div>
          <slot name="body"/>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn :disabled="submitting" color="grey-8" flat label="Cancel" v-close-popup/>
        <q-btn @click="submitForm" :loading="submitting" color="primary" label="Submit"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import {ref, computed, onMounted} from 'vue'

import {useStore} from "vuex";
import ValidationErrors from "components/ValidationErrors";

export default {
  props: {
    columns: {
      default: []
    },
    storeModel: {
      default: 'users'
    },
  },
  components: {
    ValidationErrors
  },
  setup(props) {
    const $store = useStore()
    const formDialog = computed({
      get: () => $store.state[props.storeModel].formDialog,
      set: val => {
        $store.commit(`${props.storeModel}/setFormDialog`, val)
      }
    })
    const submitting = computed({
      get: () => $store.state[props.storeModel].submitting,
      set: val => {
        $store.commit(`${props.storeModel}/setSubmitting`, val)
      }
    })
    const formData = computed({
      get: () => $store.state[props.storeModel].formData,
      set: val => {
        $store.commit(`${props.storeModel}/setFormData`, val)
      }
    })
    const errors = computed({
      get: () => $store.state[props.storeModel].errors,
      set: val => {
        $store.commit(`${props.storeModel}/setErrors`, val)
      }
    })

    onMounted(() => {

    })

    const createData = function () {
      $store
        .dispatch(`${props.storeModel}/create`)
        .then(res => {

        })
        .catch(error => {

        })
    }

    const updateData = function () {
      $store
        .dispatch(`${props.storeModel}/update`)
        .then(res => {

        })
        .catch(error => {

        })
    }

    const submitForm = function () {
      formRef.value.validate().then((success) => {
        if (success) {
          // this.modelData = this.formData
          if (formData.value.id) {
            updateData()
          } else {
            createData()
          }
        }
      });
    }
    const formRef = ref(null)
    return {
      formDialog,
      formRef,
      formData,
      submitForm,
      submitting,
      errors
    }
  }
}
</script>
