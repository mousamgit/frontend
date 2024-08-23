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
          <q-item 
             @click="navigateToFirstAvailableDashboardRoute" 
             :active="currentRoute === 'Dashboard'"
             clickable v-ripple>
            <q-item-section avatar>
              <q-icon size="" name="mdi-view-grid-plus-outline"/>
            </q-item-section>
            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>

          <q-item 
            :active="currentRoute === 'User' || currentRoute === 'Roles' || currentRoute === 'Permissions'"
            v-if="checkIfUserHasPermissions(userManagementPermissions)" 
            @click="navigateToFirstAvailableUserRoute" 
            clickable 
            v-ripple
          >
            <q-item-section avatar>
              <q-icon size="" name="mdi-account-circle-outline"/>
            </q-item-section>
            <q-item-section>
              User Management
            </q-item-section>
          </q-item>

          <q-item @click="logoutNow" clickable v-ripple>
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
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import user from 'pages/dashboard/user'
import userManagement from 'src/composables/userManagement'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const router = useRouter()
    const route = useRoute()
    const currentRoute = computed(() => route.name)
    const $q = useQuasar()
    const $store = useStore()
    const leftDrawerOpen = ref(false)
    const miniModeDrawer = ref(true)

    const { currentUser, logo } = user()
    const { userManagementPermissions, checkIfUserHasPermissions } = userManagement()

    const logoutNow = () => {
      $q.loading.show()
      $store.dispatch('auth/logout')
    }

    const navigateToFirstAvailableUserRoute = () => {
      const routePermissions = [
        { name: 'User', permission: 'view-users' },
        { name: 'Roles', permission: 'view-roles' },
        { name: 'Permissions', permission: 'view-permissions' }
      ];
      const userPermissions = currentUser.value.permissions.map(permission => permission.name);

      for (let i = 0; i < routePermissions.length; i++) {
        const { name, permission } = routePermissions[i];
        
        if (userPermissions.includes(permission)) {
          router.push({ name });
          break;
        }
      }
    };
    const navigateToFirstAvailableDashboardRoute = () => {
       
      const routePermissions = [
        { name: 'Dashboard', permission: 'view-dashboard' },
      ];
      const userPermissions = currentUser.value.permissions.map(permission => permission.name);
       
      for (let i = 0; i < routePermissions.length; i++) {
        const { name, permission } = routePermissions[i];
       
        if (userPermissions.includes(permission)) {
          router.push({ name });
          break;
        }
      }
    };



    return {
      leftDrawerOpen,
      logoutNow,
      miniModeDrawer,
      userManagementPermissions,
      checkIfUserHasPermissions,
      currentUser,
      logo,
      router,
      currentRoute,
      navigateToFirstAvailableUserRoute,
      navigateToFirstAvailableDashboardRoute,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
