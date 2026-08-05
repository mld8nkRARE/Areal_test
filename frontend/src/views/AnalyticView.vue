<template>
  <v-container>
    <h1 class="text-h5 mb-4">Аналитика комментариев</h1>

    <v-form ref="form" class="d-flex align-center mb-6" style="max-width: 640px" @submit.prevent="load">
      <v-text-field
        v-model="dateFrom"
        type="date"
        label="С"
        class="mr-2"
        :rules="fromRules"
      />
      <v-text-field
        v-model="dateTo"
        type="date"
        label="По"
        class="mr-2"
        :rules="toRules"
      />
      <v-btn type="submit" color="primary" :loading="loading">
        Показать
      </v-btn>
    </v-form>

    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

    <v-progress-linear v-if="loading" indeterminate class="mb-4" />

    <template v-if="!loading && !error">
      <p v-if="!items.length" class="text-medium-emission">
        Нет комментариев за выбранный период.
      </p>

      <v-card v-for="group in items" :key="group.article.id" class="mb-4">
        <v-card-title class="text-subtitle-1 d-flex align-center">
          <router-link :to="`/article/${group.article.id}`" class="text-decoration-none">
            {{ group.article.title }}
          </router-link>
          <span class="text-caption text-medium-emission ml-2">
            комментариев: {{ group.comments.length }}
          </span>
        </v-card-title>

        <v-card-text v-for="comment in group.comments" :key="comment.id" class="py-1">
          <span class="text-caption text-medium-emission mr-2">
            {{ formatDate(comment.createdAt) }}
          </span>
          {{ comment.content }}
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AnalyticView',

  data() {
    return {
      dateFrom: this.toInputValue(new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)),
      dateTo: this.toInputValue(new Date()),
      fromRules: [
        (v) => !!v || 'Укажите дату начала',
      ],
      toRules: [
        (v) => !!v || 'Укажите дату конца',
        (v) => !this.dateFrom || v >= this.dateFrom || 'Дата конца не может быть раньше даты начала',
      ],
    }
  },

  computed: {
    ...mapState('analytics', ['items', 'loading', 'error']),
  },

  mounted() {
    this.load()
  },

  methods: {
    formatDate(date) {
        return new Date(date).toLocaleDateString();
    },

    toInputValue(date) {
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    },

    async load() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      const dateFrom = new Date(`${this.dateFrom}T00:00:00`).getTime()
      const dateTo = new Date(`${this.dateTo}T23:59:59.999`).getTime()

      await this.$store.dispatch('analytics/fetch', { dateFrom, dateTo })
    },
  },
}
</script>