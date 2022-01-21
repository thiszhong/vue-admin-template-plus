import { createApp } from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import * as ElIcons from '@element-plus/icons-vue' // element plus icon
import MyIcon from '@/components/my-icon'

import '@/styles/index.scss' // global css

import '@/permission' // permission control

import App from './App.vue'
import router from './router'
import store from './store'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app = createApp(App)

// 图标全局注册，加了个 `el-icon-` 前缀，可根据需要修改或删除
// element plus icon global register.
// for (const iconName in ElIcons) {
//   const icon = ElIcons[iconName]
//   // prefix to avoid component conflict, feel free to modify it
//   // <el-icon><add-location /></el-icon> ->>>
//   // <el-icon><el-icon-add-location /></el-icon>
//   app.component(`ElIcon${iconName}`, icon)
// }
app.component('MyIcon', MyIcon)

app.use(ElementPlus).use(store).use(router).mount('#app')
