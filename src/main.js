import { createApp } from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import '@/styles/index.scss' // global css

import SvgIcon from '@/icons' // icon
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
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus).use(store).use(router).mount('#app')
