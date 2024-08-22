// import store from "../../store";
import { Guard } from 'vue-routisan'

class AuthGuard extends Guard {
  handle(resolve, reject, { from, to }) {
    // store()
    //   .dispatch("auth/fetchProfile")
    //   .then(r => {
    //     if (r.status == 200) {
    //       resolve()
    //     } else {
    //       reject({ name: 'login' })
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
