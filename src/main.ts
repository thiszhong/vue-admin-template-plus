import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import { setAppRouter } from './hooks'
import { routes, beforeEachGuard, afterEachGuard } from './router'

import './style/index.less'

const app = createApp(App)
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})
router.beforeEach(beforeEachGuard)
router.afterEach(afterEachGuard)
setAppRouter(router)
// app.use(ElementPlus)
app.use(router).mount('#app')
