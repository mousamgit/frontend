import common_state from "src/store/common_crud/common_state";
let initialStates = {
  model: 'users'
}
export default {...common_state, ...initialStates}
