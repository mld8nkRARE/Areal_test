<template>
  <v-container>
    <h1 class="text-h5 mb-4">
      {{ isEdit ? 'Редактирование статьи' : 'Создание статьи' }}
    </h1>

    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

    <ArticleForm
      v-if="!isEdit || current"
      :article="current"
      :submitting="loading"
      @submit="handleSubmit"
      @cancel="$router.push('/')"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ArticleForm from '../components/ArticleForm.vue'

export default {
  name: 'ArticleFormView',

  components: { ArticleForm },

  computed: {
    ...mapState('articles', ['current', 'loading', 'error']),

    isEdit() {
      return !!this.$route.params.id
    },
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler(id) {
        if (id) {
          this.$store.dispatch('articles/fetchOne', id)
        } else {
          this.$store.commit('articles/SET_CURRENT', null)
        }
      },
    },
  },

  methods: {
    async handleSubmit(payload) {
      let saved = null

      if (this.isEdit) {
        saved = await this.$store.dispatch('articles/update', {
          articleId: this.$route.params.id,
          payload,
        })
      } else {
        saved = await this.$store.dispatch('articles/create', payload)
      }

      if (saved) {
        this.$router.push('/')
      }
    },
  },
}
</script>