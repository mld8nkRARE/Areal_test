<template>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="form.title"
      label="Название"
      :rules="titleRules"
      :disabled="submitting"
    />

    <v-textarea
      v-model="form.content"
      label="Текст статьи"
      rows="6"
      :rules="contentRules"
      :disabled="submitting"
    />

    <div class="d-flex">
      <v-btn type="submit" color="primary" class="mr-2" :loading="submitting">
        Сохранить
      </v-btn>
      <v-btn variant="text" :disabled="submitting" @click="$emit('cancel')">
        Отмена
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'ArticleForm',

  props: {
    article: {
      type: Object,
      default: null,
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submit', 'cancel'],

  data() {
    return {
      form: {
        title: '',
        content: '',
      },
      titleRules: [
        (v) => (!!v && !!v.trim()) || 'Введите название',
        (v) => !v || v.length <= 255 || 'Не более 255 символов',
      ],
      contentRules: [
        (v) => (!!v && !!v.trim()) || 'Введите текст статьи',
      ],
    }
  },

  watch: {
    article: {
      immediate: true,
      handler(article) {
        if (article) {
          this.form.title = article.title
          this.form.content = article.content
        } else {
          this.form.title = ''
          this.form.content = ''
        }
      },
    },
  },

  methods: {
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      this.$emit('submit', {
        title: this.form.title.trim(),
        content: this.form.content.trim(),
      })
    },
  },
}
</script>