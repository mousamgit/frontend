<template>
  <div class="row justify-content-center mt-2 mb-2">
    <div class="col-12">
      <List :storeModel="stateName" :columns="columns"/>
    </div>
    <Create :storeModel="stateName">
      <template v-slot:body>
        <RoleCreate/>
      </template>
    </Create>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from "vuex";
import List from "components/CRUD/List";
import Create from "components/CRUD/Create";
import RoleCreate from "components/users/RoleCreate";

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
  {name: 'actions', align: 'left', label: 'Actions', field: 'action', sortable: false}
]

export default {
  components: {RoleCreate, Create, List},
  setup() {
    const $store = useStore()
    const stateName = ref('roles')
    const fetchPaged = () => {
      return $store.dispatch(`${stateName.value}/fetchPaged`)
    }


    function onRequest(props) {
      fetchPaged()
    }

    onMounted(() => {
      onRequest({})
    })
    return {
      columns,
      stateName
    }
  }
}
</script>
