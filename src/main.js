import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'

// 全部引入
// import "~/styles/element/index.scss";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

import '@/styles/index.scss'
import 'uno.css'

// 一些只使用到 API 的，需要手动导入样式
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/notification.scss'

const app = createApp(App)
// app.use(ElementPlus)
app.use(router)
app.mount('#app')
