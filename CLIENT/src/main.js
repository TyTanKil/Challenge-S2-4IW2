import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'; 

import { createRouter, createWebHistory } from 'vue-router'
import Identify from './views/AppIdentify.vue'
import Create from './views/AppCreateAccount.vue'
import Test from './views/AppTest.vue'
import Product from './views/AppProduct.vue'
import Mailer from './views/AppTestMailer.vue'
import NotFound from './views/AppNotFound.vue'
import ServerError from './views/AppServerError.vue'
import Cart from "./views/AppCart.vue"
import Success from "./views/Payment/AppSuccess.vue"
import Cancel from "./views/Payment/AppCancel.vue"
import Payment from "./views/Payment/AppTestPayment.vue"

const routes = [
  { path: '/', name: 'Home' },
  { path: '/identify', component: Identify },
  { path: '/create', component: Create },
  { path: '/test', component: Test },
  { path: '/mailer', component: Mailer },
  {
    path: '/product/:name:description:price:link_img',
    name: 'Product',
    component: Product,
    props: (route) => ({
      name: route.params.name,
      description: route.params.description,
      price: route.params.price,
      link_img: route.params.link_img
    })
  },
  { path: '/server-error', name: 'ServerError', component: ServerError },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // Catch-all route for 404
  //Stripe
  { path: "/payment", name: "Payment", component: Payment },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/success", name: "Success", component: Success },
  { path: "/cancel", name: "Cancel", component: Cancel },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(store);
app.use(router)
app.mount('#app')
