import { createRouter, createWebHistory } from 'vue-router'
import ArticleListView from '../views/ArticleListView.vue'
import ArticleFormView from '../views/ArticleFormView.vue'
import ArticleView from '../views/ArticleView.vue'
import AnalyticView from '../views/AnalyticView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'articles', component: ArticleListView },
        { path: '/article/new', name: 'article-create', component: ArticleFormView },
        { path: '/article/:id', name: 'article-view', component: ArticleView },
        { path: '/article/:id/edit', name: 'article-edit', component: ArticleFormView },
        { path: '/analytic', name: 'analytic', component: AnalyticView }
    ]
})

export default router