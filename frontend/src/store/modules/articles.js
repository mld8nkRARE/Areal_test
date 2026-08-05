import apiClient from '../../api/axios'

export default {
  namespaced: true,

  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  mutations: {
    SET_ITEMS(state, articles) {
      state.items = articles
    },
    REMOVE_ITEM(state, articleId) {
      state.items = state.items.filter((article) => article.id !== articleId)
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, message) {
      state.error = message
    },
  },

  actions: {
    async fetchList({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const { data } = await apiClient.get('/articles/')
        commit('SET_ITEMS', data)
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
      }
      finally {
        commit('SET_LOADING', false)
      }
    },

    async remove({ commit }, articleId) {
      try {
        await apiClient.delete(`/article/${articleId}/`)
        commit('REMOVE_ITEM', articleId)
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
      }
    },
  },
}

