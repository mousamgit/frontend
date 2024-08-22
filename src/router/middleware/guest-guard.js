// import store from "../../store";
import { Guard } from 'vue-routisan'

class GuestGuard extends Guard {
  logPromiseOutcomes() {
    return process.env.NODE_ENV !== 'production'
  }

  handle(resolve, reject, { from, to }) {
    // store()
    //   .dispatch("auth/fetchProfile")
    //   .then(r => {
    //     if (r.status == 200) {
    //       reject({ name: 'dashboard' })
    //     } else {
    //       resolve()
    //     }
    //   })
    //   .catch(() => {
    //     resolve()
    //   });

    // isAuthenticated()
    //   ? resolve()
    //   : reject({ name: 'auth.signin' })
  }
}
