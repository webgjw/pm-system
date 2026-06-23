import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import {
  Tab,
  Tabs,
  Tabbar,
  TabbarItem
} from 'vant'

const app = createApp(App)
app.use(router)
app.use(Tab)
app.use(Tabs)
app.use(Tabbar)
app.use(TabbarItem)

app.mount('#app')