import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import store from './store/index'; 

import { createRouter, createWebHistory } from 'vue-router'
import Identify from './views/AppIdentify.vue'
import Validate from './views/AppValidateAccount.vue'
import Create from './views/AppCreateAccount.vue'
import Product from './views/AppProduct.vue'
import NotFound from './views/AppNotFound.vue'
import ServerError from './views/AppServerError.vue'

import Cart from "./views/AppCart.vue"
import Success from "./views/Payment/AppSuccess.vue"
import Cancel from "./views/Payment/AppCancel.vue"
import Payment from "./views/Payment/AppTestPayment.vue"
import Suivi from "./views/AppTestShippment.vue"

import {jwtDecode} from 'jwt-decode';
import VueToast from 'vue-toast-notification';

import Test from './views/AppTest.vue'
import Mailer from './views/AppTestMailer.vue'

import 'vue-toast-notification/dist/theme-sugar.css';


const routes = [
  { path: '/' },
  { path: '/login', component: Identify, meta: { requiresNoAuth: true } },
  { path: '/validate/:hash',
    component: Validate,
    meta: { requiresNoAuth: true },
    props: (route) => ({
      hash: route.params.hash
    })
  },
  { path: '/create', component: Create },
  { path: '/test', component: Test, meta: { requiresAuth: true } },
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
  //Suivi 
  { path: "/suivi", name: "Suivi", component: Suivi },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && store.state.user_id == null) {
    return {
      path: '/login',
      query: {redirect: to.fullPath},
    }
  }

  if(to.meta.requiresNoAuth && store.state.user_id != null){
    return {
      path: "/",
    }
  }
});

const app = createApp(App)
app.use(store);
app.use(router)
app.use(VueToast, {
  position: 'top-right'
});
app.use(store);
app.mount('#app')
