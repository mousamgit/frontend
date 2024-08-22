export const setUsername = (state, payload) => {
  state.modelData.username = payload
}
export const setPassword = (state, payload) => {
  state.modelData.password = payload
}

export const setToken = (state, payload) => {
  state.modelData.token = payload
}
export const setOtpPage = (state, payload) => {
  state.otpPage = payload
}
export const setCurrentUser = (state, payload) => {
  state.currentUser = payload
}
