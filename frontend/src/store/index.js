import { createStore } from 'vuex'
import articles from './modules/articles'
import comments from './modules/comments'
import analytics from './modules/analytics'

export default createStore({
    modules: { articles, comments, analytics }
})