import apiClient from '../../api/axios'

export default {
  namespaced: true,

  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  mutations: {
    SET_ITEMS(state, groups) {
      state.items = groups
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, message) {
      state.error = message
    },
  },

  actions: {
    async fetch({ commit }, { dateFrom, dateTo }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const { data } = await apiClient.get('/analytic/comments/', {
          params: { dateFrom, dateTo },
        })
        commit('SET_ITEMS', data)
      }
      catch (error) {
        commit('SET_ITEMS', [])
        commit('SET_ERROR', error.response?.data?.error || error.message)
      }
      finally {
        commit('SET_LOADING', false)
      }
    },
  },
}