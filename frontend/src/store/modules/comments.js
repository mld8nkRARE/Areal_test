import apiClient from '../../api/axios'

export default {
  namespaced: true,

  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  mutations: {
    SET_ITEMS(state, comments) {
      state.items = comments
    },
    ADD_ITEM(state, comment) {
      state.items.push(comment)
    },
    UPDATE_ITEM(state, comment) {
      const index = state.items.findIndex((c) => c.id === comment.id)
      if (index !== -1) {
        state.items.splice(index, 1, comment)
      }
    },
    REMOVE_ITEM(state, commentId) {
      state.items = state.items.filter((c) => c.id !== commentId)
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, message) {
      state.error = message
    },
  },

  actions: {
    async fetchByArticle({ commit }, articleId) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      try {
        const { data } = await apiClient.get(`/article/${articleId}/comments/`)
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

    async create({ commit }, { articleId, content }) {
      commit('SET_ERROR', null)

      try{
        const { data } = await apiClient.post(`/article/${articleId}/comment/`, { content })
        commit('ADD_ITEM', data)
        return data
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
        return null
      }
    },

    async update({ commit }, { articleId, commentId, content }) {
      commit('SET_ERROR', null)

      try{
        const { data } = await apiClient.patch(`/article/${articleId}/comment/${commentId}/`, { content })
        commit('UPDATE_ITEM', data)
        return data
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
        return null
      }
    },

    async remove({ commit }, { articleId, commentId }) {
      try {
        await apiClient.delete(`/article/${articleId}/comment/${commentId}/`)
        commit('REMOVE_ITEM', commentId)
        return true
      }
      catch (error) {
        commit('SET_ERROR', error.response?.data?.error || error.message)
        return false
      }
    },
  },
}