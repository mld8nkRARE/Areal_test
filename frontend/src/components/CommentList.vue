<template>
  <div>
    <h2 class="text-h6 mb-2">Комментарии ({{ items.length }})</h2>

    <v-progress-linear v-if="loading" indeterminate class="mb-2" />

    <p v-else-if="!items.length" class="text-medium-emission mb-2">
      Комментариев пока нет.
    </p>

    <v-card v-for="comment in items" :key="comment.id" variant="outlined" class="mb-2">
      <CommentForm
        v-if="editingId === comment.id"
        :initial-text="comment.content"
        submit-label="Сохранить"
        show-cancel
        @submit="(text) => submitUpdate(comment.id, text)"
        @cancel="editingId = null"
      />

      <template v-else>
        <v-card-text class="pb-0">{{ comment.content }}</v-card-text>
        <v-card-actions>
          <span class="text-caption text-medium-emission">
            {{ formatDate(comment.createdAt) }}
            <template v-if="comment.updatedAt !== comment.createdAt">
              · изменено {{ formatDate(comment.updatedAt) }}
            </template>
          </span>
          <v-spacer />
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            title="Редактировать"
            @click="editingId = comment.id"
          />
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            title="Удалить"
            @click="removeComment(comment)"
          />
        </v-card-actions>
      </template>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentForm from './CommentForm.vue'

export default {
  name: 'CommentList',

  components: { CommentForm },

  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      editingId: null,
    }
  },

  computed: {
    ...mapState('comments', ['items', 'loading']),
  },

  methods: {
    formatDate(date) {
        return new Date(date).toLocaleDateString();
    },

    async submitUpdate(commentId, text) {
      const saved = await this.$store.dispatch('comments/update', {
        articleId: this.articleId,
        commentId,
        content: text,
      })

      if (saved) {
        this.editingId = null
      }
    },

    async removeComment(comment) {
      const confirmed = window.confirm('Удалить комментарий?')
      if (!confirmed) return

      await this.$store.dispatch('comments/remove', {
        articleId: this.articleId,
        commentId: comment.id,
      })
    },
  },
}
</script>