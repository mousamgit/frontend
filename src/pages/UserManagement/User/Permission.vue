<template>
  <q-page padding>
    <PermissionListComponent/>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import PermissionListComponent from "components/users/PermissionListComponent";

export default defineComponent({
  components: {PermissionListComponent}
});
</script>
