import {store} from 'quasar/wrappers'
import {createStore} from 'vuex'

import auth from './auth'
import validationErrors from './validationErrors'
import users from './users'
import roles from './roles'
import permissions from './permissions'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      auth,
      validationErrors,
      users,
      roles,
      permissions
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    // process.env.DEBUGGING
    strict: false
  })

  return Store
})
