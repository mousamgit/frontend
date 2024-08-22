<template>
  <div class="row justify-content-center mt-2 mb-2">
    <div class="col-12">
      <List :storeModel="'users'" :columns="columns"/>
    </div>
    <Create :storeModel="'users'">
      <template v-slot:body>

        <UserCreate/>
      </template>
    </Create>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from "vuex";
import List from "components/CRUD/List";
import Create from "components/CRUD/Create";
import UserCreate from "components/users/UserCreate";

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  {name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true},
  {
    name: 'role',
    required: false,
    label: 'Role',
    align: 'left',
    field: row => row.roleParsed,
    format: val => `${val ? val.name : '-'}`,
    sortable: false
  },
  {name: 'actions', align: 'left', label: 'Actions', field: 'action', sortable: false}
]

export default {
  components: {UserCreate, Create, List},
  setup() {
    const $store = useStore()
    const fetchPaged = () => {
      return $store.dispatch(`users/fetchPaged`)
    }
    const formData = computed({
      get: () => $store.state[props.storeModel].formData,
      set: val => {
        $store.commit(`${props.storeModel}/setFormDialog`, val)
      }
    })

    function onRequest(props) {
      fetchPaged()
    }

    onMounted(() => {
      onRequest({})
    })
    return {
      columns,
    }
  }
}
</script>
