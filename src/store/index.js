import {store} from 'quasar/wrappers'
import {createStore} from 'vuex'

import auth from './auth'
import validationErrors from './validationErrors'
import users from './users'
import roles from './roles'
import permissions from './permissions'

export default store(function () {
  const Store = createStore({
    modules: {
      auth,
      validationErrors,
      users,
      roles,
      permissions
    },

    strict: false
  })

  return Store
})
