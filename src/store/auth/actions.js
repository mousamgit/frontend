import {api} from "boot/axios";
import {LocalStorage} from "quasar";

export function submitLogin(state, data) {
  var params = {
    username: data.username,
    password: data.password,
  };
 
  const LOGIN_CREDENTIALS = {
    grant_type: "password",
    client_id: parseInt(process.env.CLIENT_ID),
    client_secret: process.env.CLIENT_SECRET,
    scope: "*"
  };
  Object.assign(params, LOGIN_CREDENTIALS);
  const p = new Promise(function (resolve, reject) {
    return api
      .post('api/user/login', params)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        const refresh_token = response.data.token;
        api.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        state.dispatch("setAccessToken", {
          token: token,
          refresh_token: refresh_token,
          logintype: 'admin'
        });

        // state.dispatch("fetch");

        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
  return p;
}

export function verifyOtpTokenSubmit(state, data) {
  const p = new Promise(function (resolve, reject) {
    return api
      .post('api/v1/verify-otp-token', data)
      .then(response => {
        const token = response.data.data.token;
        const refresh_token = response.data.token;
        api.defaults.headers.common["Authorization"] =
          "Bearer " + token;
        state.dispatch("setAccessToken", {
          token: token,
          refresh_token: refresh_token,
          logintype: 'consumer'
        });
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
  return p;
}

export function setAccessToken(state, data) {
  api.defaults.headers.common["Authorization"] =
    "Bearer " + data.token;
  LocalStorage.set("access_token", data.token);
  LocalStorage.set("refresh_token", data.refresh_token);
  LocalStorage.set("logintype", data.logintype);
}

export async function fetchProfile({commit, state}) {
  var token = LocalStorage.getItem("access_token");
  if (token) {
    const user = state.currentUser;
    if (user) {
      return {
        status: 200,
        data: {
          data: user
        }
      };
    }
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
    return api.get('api/v1/profile').then(response => {
      commit("setCurrentUser", response.data.data);
      return response;
    });
  }
}

export function logout(state) {
  api.post('api/v1/logout').then(response => {
  });
  LocalStorage.remove("access_token");
  LocalStorage.remove("refresh_token");
  window.location.reload("/");
  state.commit("setCurrentUser", null);
}
