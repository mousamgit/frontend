export const commonCrudMutations = {
  setAll(state, items) {
    state.all = items;
  },

  pushToAll(state, items) {
    items.forEach(item => {
      state.all.push(item);
    });
  },

  setTotalNumber(state, item) {
    state.pagination.rowsNumber = item;
  },

  setTotalPage(state, item) {
    state.pagination.totalPage = item;
  },

  setLoading(state, loading) {
    state.loading = loading;
  },
  setSelected(state, payload) {
    state.selected = payload;
  },

  setSubmitting(state, loading) {
    state.submitting = loading;
  },
  increasePage(state) {
    state.pagination.page++;
  },

  setRows(state, val) {
    state.rows = val;
  },

  setFilter(state, val) {
    state.filter = val;
  },
  setPagination(state, val) {
    state.pagination = val;
  },
  setFormDialog(state, val) {
    state.formDialog = val;
  },
  setFormData(state, val) {
    state.formData = val;
  },
  setErrors(state, val) {
    state.errors = val;
  },
}
