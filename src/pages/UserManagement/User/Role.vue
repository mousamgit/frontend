<template>
  <q-page padding>
    <RoleListComponent/>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import RoleListComponent from "components/users/RoleListComponent";

export default defineComponent({
  components: {RoleListComponent}
});
</script>
