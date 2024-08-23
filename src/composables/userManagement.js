import {ref, computed} from "vue";
import {useStore} from 'vuex'
import _ from "lodash";

export default function () {
  const $store = useStore()

  const currentUser = computed({
    get: () => $store.state.auth.currentUser,
    set: val => {
    }
  })
  const checkIfUserHasPermissions = function (permissions) {
    if (currentUser.value) {
      const user = currentUser.value;
      if (user) {
        let p = _.clone(user.permissions);
        p = p.map(r => {
          return r.name;
        });
        return _.intersection(p, permissions).length > 0;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  const drawerData = ref([
    {
      type: "header",
      label: "User Management",
    },
    {
      route: "User",
      icon: "mdi-account-cog-outline",
      label: "all.users",
      checkPermission: ['view-users']
    },
    {
      route: "Roles",
      icon: "mdi-shield-account-outline",
      label: "all.roles",
      checkPermission: ['view-roles']
    },
    {
      route: "Permissions",
      icon: "mdi-shield-key-outline",
      label: "all.permissions",
      checkPermission: ['view-permissions']
    },
  ])

  const userManagementPermissions  = ref([
    'view-users', 'create-users','update-users','delete-users','export-users',
    'view-roles', 'create-roles','update-roles','delete-roles','export-roles',
    'view-permissions', 'create-permissions','update-permissions','delete-permissions','export-permissions'
  ])
  return {
    currentUser,
    drawerData,
    userManagementPermissions,
    checkIfUserHasPermissions
  }
}
