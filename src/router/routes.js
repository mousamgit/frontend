// import { auth, guest } from "../router/middleware/index";
import {Route, Factory} from 'vue-routisan'
import {Guard} from 'vue-routisan'
import store from "../store";

class GuestGuard extends Guard {
  logPromiseOutcomes() {
    return process.env.NODE_ENV !== 'production'
  }

  handle(resolve, reject, {from, to}) {
    store()
      .dispatch("auth/fetchProfile")
      .then(r => {
        if (r.status == 200) {
          reject({name: 'dashboard'})
        } else {
          resolve()
        }
      })
      .catch(() => {
        resolve()
      });

    // isAuthenticated()
    //   ? resolve()
    //   : reject({ name: 'auth.signin' })
  }
}

class AuthGuard extends Guard {
  handle(resolve, reject, {from, to}) {
    store()
      .dispatch("auth/fetchProfile")
      .then(r => {
        if (r.status == 200) {
          resolve()
        } else {
          reject({name: 'login'})
        }
      })
      .catch(() => {
        reject({name: 'login'})
      });

    // isAuthenticated()
    //   ? resolve()
    //   : reject({ name: 'auth.signin' })
  }
}

const guards = {
  guest: GuestGuard,
  auth: AuthGuard
};
Factory.usingResolver(path => () => import(`/src/pages/${path}`)).withGuards(guards)
Route.redirect('/', '/login')
Route.view("/", "layouts/Auth")
  .guard('guest')
  .children(() => {
    Route.view("/login", "auth/login").name('login')
  });


Route.view("/", "layouts/Main")
  .guard('auth')
  .children(() => {
    Route.view("/dashboard", "dashboard/dashboard").name('Dashboard')

    Route.view("user-management", "UserManagement/Layout")
      .guard('auth')
      .children(() => {
        Route.view("/users", "UserManagement/User/User").name('User')
        Route.view("/roles", "UserManagement/User/Role").name('Roles')
        Route.view("/permissions", "UserManagement/User/Permission").name('Permissions')


      });
  });
Route.view("/:catchAll(.*)*", "Error404");


if (process.env.MODE !== "ssr") {
  Route.view("*", "Error404");
}

export default Factory.routes();
