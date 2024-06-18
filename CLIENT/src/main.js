import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Identify from './views/AppIdentify.vue'
import Create from './views/AppCreateAccount.vue'
import Test from './views/AppTest.vue'
import Admin from './views/AppAdminDashboard.vue'
import Users from './views/AppAdminUsers.vue'

const routes = [
  { path: '/identify', component: Identify },
  { path: '/create', component: Create },
  { path: '/test', component: Test },
  { path: '/admin', component: Admin },
  { path: '/admin/users', component: Users}


  // autres routes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
