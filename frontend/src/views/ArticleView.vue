<template>
  <v-container>
    <v-progress-linear v-if="articleLoading" indeterminate class="mb-4" />

    <v-alert v-if="articleError" type="error" class="mb-4">{{ articleError }}</v-alert>
    <v-alert v-if="commentsError" type="error" class="mb-4">{{ commentsError }}</v-alert>

    <template v-if="article">
      <div class="d-flex align-center mb-2">
        <h1 class="text-h5">{{ article.title }}</h1>
        <v-spacer />
        <v-btn
          icon="mdi-pencil"
          variant="text"
          title="Редактировать статью"
          :to="`/article/${article.id}/edit`"
        />
        <v-btn
          icon="mdi-delete"
          variant="text"
          color="error"
          title="Удалить статью"
          @click="removeArticle"
        />
      </div>

      <p class="text-caption text-medium-emission mb-2">
        Создана: {{ formatDate(article.createdAt) }} · Изменена: {{ formatDate(article.updatedAt) }}
      </p>

      <p class="mb-6" style="white-space: pre-line">{{ article.content }}</p>

      <h2 class="text-h6 mb-2">Добавить комментарий</h2>
      <CommentForm
        ref="commentForm"
        :submitting="commentsLoading"
        class="mb-6"
        @submit="addComment"
      />

      <CommentList :article-id="article.id" />
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CommentForm from '../components/CommentForm.vue'
import CommentList from '../components/CommentList.vue'

export default {
  name: 'ArticleView',

  components: { CommentForm, CommentList },

  computed: {
    ...mapState('articles', {
      article: (state) => state.current,
      articleLoading: (state) => state.loading,
      articleError: (state) => state.error,
    }),
    ...mapState('comments', {
      commentsLoading: (state) => state.loading,
      commentsError: (state) => state.error,
    }),
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler(id) {
        const articleId = Number(id)
        this.$store.dispatch('articles/fetchOne', articleId)
        this.$store.dispatch('comments/fetchByArticle', articleId)
      },
    },
  },

  methods: {
    formatDate(date) {
        return new Date(date).toLocaleDateString();
    },

    async addComment(text) {
      const saved = await this.$store.dispatch('comments/create', {
        articleId: this.article.id,
        content: text,
      })

      if (saved) {
        this.$refs.commentForm.clear()
      }
    },

    async removeArticle() {
      const confirmed = window.confirm(`Удалить статью "${this.article.title}"?`)
      if (!confirmed) return

      await this.$store.dispatch('articles/remove', this.article.id)
      this.$router.push('/')
    },
  },
}
</script>