<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-4">
      <h1 class="text-h5">Статьи</h1>
      <v-btn color="primary" to="/article/new">Создать статью</v-btn>
    </div>

    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Загрузка статей..."
      no-data-text="Статей пока нет"
    >
      <template v-slot:item.createdAt="{ value }">
        {{ formatDate(value) }}
      </template>

      <template v-slot:item.updatedAt="{ value }">
        {{ formatDate(value) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-eye" variant="text" :to="`/article/${item.id}`" title="Просмотр" />
        <v-btn icon="mdi-pencil" variant="text" :to="`/article/${item.id}/edit`" title="Редактировать" />
        <v-btn
          icon="mdi-delete"
          variant="text"
          color="error"
          title="Удалить"
          @click="removeArticle(item)"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticleListView',

  data() {
    return {
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Название', key: 'title' },
        { title: 'Дата создания', key: 'createdAt' },
        { title: 'Дата модификации', key: 'updatedAt' },
        { title: 'Действия', key: 'actions', sortable: false, align: 'end' },
      ],
    }
  },

  computed: {
    ...mapState('articles', ['items', 'loading', 'error']),
  },

  mounted() {
    this.$store.dispatch('articles/fetchList')
  },

  methods: {
    formatDate(date) {
        return new Date(date).toLocaleDateString();
    },

    async removeArticle(article) {
      const confirmed = window.confirm(`Удалить статью "${article.title}"?`)
      if (!confirmed) return

      await this.$store.dispatch('articles/remove', article.id)
    },
  },
}
</script>