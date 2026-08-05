import apiClient from '../../api/axios'

export default {
  namespaced: true,

  state: () => ({
    items: [],
    current: null,
    loading: false,
    error: null,
  }),

  mutations: {
    SET_ITEMS(state, articles) {
      state.items = articles
    },
    SET_CURRENT(state, article) {
      state.current = article
    },
    ADD_ITEM(state, article) {
      state.items.unshift(article)
    },
    UPDATE_ITEM(state, article) {
      const index = state.items.findIndex((a) => a.id === article.id)
      if (index !== -1) {
        state.items.splice(index, 1, article)
      }
    },
    REMOVE_ITEM(state, articleId) {
      state.items = state.items.filter((a) => a.id !== articleId)
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

    async fetchOne({ commit }, articleId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const { data } = await apiClient.get(`/article/${articleId}/`)
        commit('SET_CURRENT', data)
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
      }
      finally {
        commit('SET_LOADING', false)
      }
    },

    async create({ commit }, payload) {
      commit('SET_ERROR', null)

      try {
        const { data } = await apiClient.post('/article/', payload)
        commit('ADD_ITEM', data)
        return data
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
        return null
      }
    },

    async update({ commit }, { articleId, payload }) {
      commit('SET_ERROR', null)

      try {
        const { data } = await apiClient.patch(`/article/${articleId}/`, payload)
        commit('UPDATE_ITEM', data)
        commit('SET_CURRENT', data)
        return data
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
        return null
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