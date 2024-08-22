<template>
  <q-page padding>
    <UserListComponent/>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import UserListComponent from "components/users/UserListComponent";

export default defineComponent({
  components: {UserListComponent}
});
</script>
