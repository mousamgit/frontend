import {api} from "boot/axios";
import _ from "lodash";

export const commonCrudActions = {
  fetchPaged({commit, state}) {
    commit("setLoading", true);
    let pagination = state.pagination;
    let query = state.filter;
    let filters = JSON.stringify(state.filters);
    return new Promise((resolve, reject) => {
      api
        .get(
          "api/v1/" +
          state.model +
          "?page=" +
          pagination.page +
          "&rowsPerPage=" +
          pagination.rowsPerPage +
          "&sortBy=" +
          pagination.sortBy +
          "&descending=" +
          pagination.descending +
          "&query=" +
          query +
          "&filters=" +
          filters
        )
        .then(response => {
          commit("setRows", response.data.data);
          if (response.data.meta) {
            commit("setTotalNumber", response.data.meta.total);
            commit("setTotalPage", response.data.meta.last_page);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    });
  },


  fetchIncreasedPaged({commit, state}) {
    commit("setLoading", true);
    commit("increasePage");
    let pagination = state.serverPagination;
    let query = state.query;
    let filters = JSON.stringify(state.filters);
    return new Promise((resolve, reject) => {
      api
        .get(
          "api/v1/" +
          state.model +
          "?page=" +
          pagination.page +
          "&rowsPerPage=" +
          pagination.rowsPerPage +
          "&sortBy=" +
          pagination.sortBy +
          "&descending=" +
          pagination.descending +
          "&query=" +
          query +
          "&filters=" +
          filters
        )
        .then(response => {
          commit("pushToAll", response.data.data);
          if (response.data.meta) {
            commit("setTotalNumber", response.data.meta.total);
            commit("setTotalPage", response.data.meta.last_page);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    });
  },

  create({commit, state, dispatch}) {
    commit('setSubmitting', true)
    return new Promise((resolve, reject) => {
      api
        .post('api/v1/' + state.model, state.formData)
        .then(response => {
          commit('setSubmitting', false)
          commit('setFormDialog', false)
          dispatch('fetchPaged')
          resolve(response)
        })
        .catch(error => {
          commit('setSubmitting', false)
          if (error.response && error.response.status == 422) {
            commit('setErrors', error.response.data.errors)
          }
          reject(error)
        })
    })
  },


  fetchAll({commit, state}) {
    return new Promise((resolve, reject) => {
      api
        .get(
          "api/v1/" +
          state.model +
          "/all"
        )
        .then(response => {
          commit("setAll", response.data.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
        });
    });
  },

  resetForm({commit, state}) {
    commit('setFormData', {
      guard_name: 'user-api'
    })
    commit('setErrors', {})
  },

  destroy({
            commit,
            state,
            dispatch
          }) {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
      const items = _.map(state.selected, item => {
        return item.id
      })
      api
        .post('api/v1/' + state.model + '/delete', {
          delete_rows: items
        })
        .then(response => {
          dispatch('fetchPaged')
          commit('setLoading', false)
          resolve(response)
        })
        .catch(error => {
          commit('setLoading', false)
          reject(error)
        })
    })
  },

  update({commit, state}) {
    commit('setSubmitting', true)
    let id = state.formData.id
    if (id == undefined) {
      id = state.formData.get('id')
    }
    return new Promise((resolve, reject) => {
      api
        .put('api/v1/' + state.model + '/' + id, state.formData)
        .then(response => {
          var item = _.find(state.rows, function (o) {
            return id == o.id
          })
          Object.assign(item, response.data.data)
          commit('setFormDialog', false)
          commit('setSubmitting', false)
          resolve(response)
        })
        .catch(error => {
          commit('setSubmitting', false)
          if (error.response && error.response.status == 422) {
            commit('setErrors', error.response.data.errors)
          }
          reject(error)
        })
    })
  }

}
