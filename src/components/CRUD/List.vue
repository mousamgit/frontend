<template>
  <div class="row justify-content-center mt-2 mb-2">
    <div class="col-12">
      <q-table
        flat
        :title="$t('all.'+storeModel)"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        @request="onRequest"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-input clearable borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn color="primary" class="q-ml-md" round @click="createNew" icon="mdi-plus"/>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <edit-btn
              @onClick="edit(props.row)"
            />
            <delete-btn
              @onClick="confirmDelete(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'

import {useStore} from "vuex";
import {resetForm} from "src/store/users/actions";

import EditBtn from "components/CRUD/EditBtn";
import DeleteBtn from "components/CRUD/DeleteBtn";
import _ from "lodash";
import {useQuasar} from 'quasar'

export default {
  props: {
    columns: {
      default: []
    },
    storeModel: {
      default: ''
    },
  },
  components: {
    EditBtn,
    DeleteBtn
  },
  setup(props) {
    const $store = useStore()
    const formDialog = computed({
      get: () => $store.state[props.storeModel].formDialog,
      set: val => {
        $store.commit(`${props.storeModel}/setFormDialog`, val)
      }
    })
    const rows = computed({
      get: () => $store.state[props.storeModel].rows,
      set: val => {
        $store.commit(`${props.storeModel}/setRows`, val)
      }
    })
    const filter = computed({
      get: () => $store.state[props.storeModel].filter,
      set: val => {
        $store.commit(`${props.storeModel}/setFilter`, val)
      }
    })
    const loading = computed({
      get: () => $store.state[props.storeModel].loading,
      set: val => {
        $store.commit(`${props.storeModel}/setLoading`, val)
      }
    })

    const pagination = computed({
      get: () => $store.state[props.storeModel].pagination,
      set: val => {

        $store.commit(`${props.storeModel}/setPagination`, val)
      }
    })

    const fetchPaged = () => {
      return $store.dispatch(`${props.storeModel}/fetchPaged`)
    }

    function onRequest(props) {
      const {page, rowsPerPage, sortBy, descending} = props.pagination
      pagination.value = (props.pagination)
      fetchPaged()
    }

    const resetForm = () => {
      return $store.dispatch(`${props.storeModel}/resetForm`)
    }
    const formData = computed({
      get: () => $store.state[props.storeModel].formData,
      set: val => {
        $store.commit(`${props.storeModel}/setFormData`, val)
      }
    })
    const selected = computed({
      get: () => $store.state[props.storeModel].selected,
      set: val => {
        $store.commit(`${props.storeModel}/setSelected`, val)
      }
    })

    const createNew = () => {
      formDialog.value = true
      resetForm()
    }

    const edit = (item) => {
      formData.value = _.clone(item);
      formDialog.value = true;
    }
    const $q = useQuasar()
    const confirmDelete = (item) => {
      $q
        .dialog({
          title: 'Are you sure?',
          ok: 'Confirm?',
          cancel: 'Cancel',
          message: 'Delete this record?',
          persistent: true
        })
        .onOk(() => {
          selected.value.push(item)
          $store
            .dispatch(`${props.storeModel}/destroy`)
            .then(res => {

            })
            .catch(error => {
              console.error(error)
            })
        })
        .onCancel(() => {
          console.log('>>>> Cancel')
        })
    }
    onMounted(() => {
      // get initial data from server (1st page)

    })

    return {
      filter,
      loading,
      pagination,
      rows,
      onRequest,
      formDialog,
      createNew,
      edit,
      formData,
      confirmDelete
    }
  }
}
</script>
