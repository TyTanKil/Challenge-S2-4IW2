import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Identify from './views/AppIdentify.vue'
import Create from './views/AppCreateAccount.vue'
import Test from './views/AppTest.vue'
import Admin from './views/AppAdminDashboard.vue'
import Users from './views/AppAdminUsers.vue'
import ProductList from './views/AppAdminProducts.vue'
import NewProduct from './views/admin/AppAddProduct.vue'
import EditProduct from './views/admin/AppEditProduct.vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const routes = [
  { path: '/identify', component: Identify },
  { path: '/create', component: Create },
  { path: '/test', component: Test },
  { path: '/admin', component: Admin },
  { path: '/admin/users', component: Users },
  { path: '/admin/products', name: 'ProductList', component: ProductList },
  { path: '/admin/product/new', name: 'AddProduct', component: NewProduct },
  { path: '/admin/product/edit/:id', name: 'EditProduct', component: EditProduct, props: true }

  // autres routes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000
}

const app = createApp(App)
app.use(router).use(Toast, options)
app.mount('#app')
