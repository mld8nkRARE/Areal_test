<template>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-textarea
      v-model="text"
      label="Текст комментария"
      rows="3"
      :rules="rules"
      :disabled="submitting"
    />

    <div class="d-flex">
      <v-btn type="submit" color="primary" class="mr-2" :loading="submitting">
        {{ submitLabel }}
      </v-btn>
      <v-btn v-if="showCancel" variant="text" :disabled="submitting" @click="$emit('cancel')">
        Отмена
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'CommentForm',

  props: {
    initialText: {
      type: String,
      default: '',
    },
    submitLabel: {
      type: String,
      default: 'Отправить',
    },
    submitting: {
      type: Boolean,
      default: false,
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submit', 'cancel'],

  data() {
    return {
      text: '',
      rules: [
        (v) => (!!v && !!v.trim()) || 'Введите текст комментария',
      ],
    }
  },

  watch: {
    initialText: {
      immediate: true,
      handler(value) {
        this.text = value
      },
    },
  },

  methods: {
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      this.$emit('submit', this.text.trim())
    },

    clear() {
      this.text = ''
      this.$nextTick(() =>{
      this.$refs.form?.resetValidation()
      })
    },
  },
}
</script>