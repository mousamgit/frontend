<template>
  <q-layout view="lHh Lpr lff">
    <q-drawer
      :mini="miniModeDrawer"
      mini-to-overlay
      show-if-above
      :width="270"
      @mouseout="miniModeDrawer = true"
      @mouseover="miniModeDrawer = false"
      :breakpoint="400"
      class="main-drawer"
      content-class="my-drawer-class"
    >
      <q-scroll-area style="height: calc(100%); border-right: 1px solid rgb(112, 117, 121);">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon class="bg-white rounded-borders" size="" :name="'img:' + logo"/>
            </q-item-section>
            <q-item-section>
              {{ $t('app.title') }}
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon size="" name="mdi-view-grid-plus-outline"/>
            </q-item-section>
            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>

          <q-item :active="route.name=='User' || route.name=='Roles' || route.name=='Permissions'" v-if="checkIfUserHasPermissions(userManagementPermissions)" @click="router.push({name: 'User'})" clickable v-ripple>
            <q-item-section avatar>
              <q-icon size="" name="mdi-account-circle-outline"/>
            </q-item-section>
            <q-item-section>
              User Management
            </q-item-section>
          </q-item>

          <q-item  @click="logoutNow" clickable v-ripple>
            <q-item-section avatar>
              <q-icon size="" name="mdi-logout"/>
            </q-item-section>
            <q-item-section>
              Logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>


<script>


import {defineComponent, ref, computed} from 'vue'
import {useStore} from "vuex";
import {useQuasar} from 'quasar'
import user from "pages/dashboard/user";
import {useRouter, useRoute} from "vue-router";
import userManagement from "src/composables/userManagement";

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentRoute = computed(() => route.name)
    const $q = useQuasar()
    const $store = useStore()
    const leftDrawerOpen = ref(false)
    const miniModeDrawer = ref(true)
    const logoutNow = () => {

      $q.loading.show();
      $store.dispatch('auth/logout')
    }
    const {currentUser, logo} = user();

    const {userManagementPermissions, checkIfUserHasPermissions} = userManagement()
    return {
      leftDrawerOpen,
      logoutNow,
      miniModeDrawer,
      userManagementPermissions,
      checkIfUserHasPermissions,
      currentUser,
      logo,
      router,
      route,
      currentRoute,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
