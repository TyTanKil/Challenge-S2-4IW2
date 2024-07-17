import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Identify from './views/AppIdentify.vue'
import Validate from './views/AppValidateAccount.vue'
import Create from './views/AppCreateAccount.vue'
import Product from './views/AppProduct.vue'
import NotFound from './views/AppNotFound.vue'
import ServerError from './views/AppServerError.vue'
import MyAccount from './views/AppMyAccount.vue';
import {jwtDecode} from 'jwt-decode';
import VueToast from 'vue-toast-notification';

import Test from './views/AppTest.vue'
import Mailer from './views/AppTestMailer.vue'

import 'vue-toast-notification/dist/theme-sugar.css';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user_id: localStorage.getItem('jwtToken') ? jwtDecode(localStorage.getItem('jwtToken')).id : null,
      user_name: localStorage.getItem('jwtToken') ? jwtDecode(localStorage.getItem('jwtToken')).name : null,
    }
  },
  mutations: {
    updateUser(state) {
      const token = localStorage.getItem('jwtToken');
      if(token) {
        state.user_id = jwtDecode(localStorage.getItem('jwtToken')).id;
        state.user_name = jwtDecode(localStorage.getItem('jwtToken')).name;
      }
    }
  }
})

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
  { path: '/account', component: MyAccount },
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
app.use(router)
app.use(VueToast, {
  position: 'top-right'
});
app.use(store);
app.mount('#app')
