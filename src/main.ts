import { createApp } from "vue"
import App from "./App.vue"

import "virtual:svg-icons-register" // 雪碧图注册
import registerSvg from "@/icons"
import registerElement from "@/plugins/element"

import router from "./router"
import store from "./store"
// 全局组件
// import ElementPlus from "element-plus"
// import "element-plus/dist/index.css"
// 全局css样式
import "@/assets/styles/index.scss"

const app = createApp(App)
app.use(registerSvg)
app.use(store)
app.use(router)
app.use(registerElement)
app.mount("#app")
