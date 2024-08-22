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
        // return true;
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
      checkPermission: ['view-users', 'manage-users']
    },
    {
      route: "Roles",
      icon: "mdi-shield-account-outline",
      label: "all.roles",
      checkPermission: ['view-roles', 'manage-roles']
    },
    {
      route: "Permissions",
      icon: "mdi-shield-key-outline",
      label: "all.permissions",
      checkPermission: ['view-permissions', 'manage-permissions']
    },
  ])

  const userManagementPermissions  = ref([
    'view-users', 'manage-users',
    'view-roles', 'manage-roles',
    'view-permissions', 'manage-permissions'
  ])
  return {
    currentUser,
    drawerData,
    userManagementPermissions,
    checkIfUserHasPermissions
  }
}
