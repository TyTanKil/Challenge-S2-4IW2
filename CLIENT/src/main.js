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
import MyAccount from './views/AppMyAccount.vue'
import AppContact from './views/AppContact.vue'

import Cart from './views/AppCart.vue'
import Success from './views/Payment/AppSuccess.vue'
import Cancel from './views/Payment/AppCancel.vue'
import Payment from './views/Payment/AppTestPayment.vue'

import { jwtDecode } from 'jwt-decode'
import VueToast from 'vue-toast-notification'

import Test from './views/AppTest.vue'
import Admin from './views/AppAdminDashboard.vue'
import EditUser from './views/admin/AppEditUser.vue'
import Users from './views/AppAdminUsers.vue'
import ProductList from './views/AppAdminProducts.vue'
import NewProduct from './views/admin/AppAddProduct.vue'
import EditProduct from './views/admin/AppEditProduct.vue'

import CategoryList from './views/admin/AppCategoryList.vue'
import NewCategory from './views/admin/AppAddCategory.vue'
import EditCategory from './views/admin/AppEditCategory.vue'

import ManufacturerList from './views/admin/AppManufacturerList.vue'
import NewManufacturer from './views/admin/AppAddManufacturer.vue'
import EditManufacturer from './views/admin/AppEditManufacturer.vue'
import Mailer from './views/AppTestMailer.vue'

/* Footer */
import InfosLegales from './views/AppInformationsLegales.vue'
import AppCGV from './views/AppCGV.vue'
import AppDeclarationCookies from './views/AppDeclarationCookies.vue'
import AppDonneesPersonnelles from './views/AppDonneesPersonnelles.vue'

import 'vue-toast-notification/dist/theme-sugar.css'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user_id: localStorage.getItem('jwtToken')
        ? jwtDecode(localStorage.getItem('jwtToken')).id
        : null,
      user_name: localStorage.getItem('jwtToken')
        ? jwtDecode(localStorage.getItem('jwtToken')).name
        : null
    }
  },
  mutations: {
    updateUser(state) {
      const token = localStorage.getItem('jwtToken')
      if (token) {
        state.user_id = jwtDecode(localStorage.getItem('jwtToken')).id
        state.user_name = jwtDecode(localStorage.getItem('jwtToken')).name
      }
    },
    clearUser(state) {
      state.user_id = null
      state.user_name = null
    }
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem('jwtToken')
      commit('clearUser')
    }
  }
})

const routes = [
  { path: '/' },
  { path: '/login', component: Identify, meta: { requiresNoAuth: true } },
  {
    path: '/validate/:hash',
    component: Validate,
    meta: { requiresNoAuth: true },
    props: (route) => ({
      hash: route.params.hash
    })
  },
  { path: '/create', component: Create },
  { path: '/test', component: Test },
  { path: '/contact', component: AppContact },
  { path: '/admin', component: Admin },
  { path: '/admin/users', name: 'UserList', component: Users },
  { path: '/admin/products', name: 'ProductList', component: ProductList },
  { path: '/admin/product/new', name: 'AddProduct', component: NewProduct },
  { path: '/admin/product/edit/:id', name: 'EditProduct', component: EditProduct, props: true },
  { path: '/admin/category/new', name: 'AddCategory', component: NewCategory },
  { path: '/admin/category', name: 'CategoryList', component: CategoryList },
  { path: '/admin/category/edit/:id', name: 'EditCategory', component: EditCategory, props: true },
  { path: '/admin/manufacturers/new', name: 'AddManufacturer', component: NewManufacturer },
  { path: '/admin/manufacturers', name: 'ManufacturerList', component: ManufacturerList },
  { path: '/account', name: 'Account', component: MyAccount },
  {
    path: '/admin/manufacturer/edit/:id',
    name: 'EditManufacturer',
    component: EditManufacturer,
    props: true
  },
  { path: '/admin/users/edit/:id', name: 'EditUser', component: EditUser },

  // autres routes
  { path: '/test', component: Test, meta: { requiresAuth: true } },
  { path: '/mailer', component: Mailer },
  {
    path: '/product/:id',
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
  { path: '/payment', name: 'Payment', component: Payment },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/success', name: 'Success', component: Success },
  { path: '/cancel', name: 'Cancel', component: Cancel },
  { path: '/informations_legales', name: 'InfosLegales', component: InfosLegales },
  { path: '/cgv', name: 'AppCGV', component: AppCGV },
  { path: '/declaration_cookies', name: 'DeclarationCookies', component: AppDeclarationCookies },
  { path: '/donnees_personnelles', name: 'DonneesPersonnelles', component: AppDonneesPersonnelles },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && store.state.user_id == null) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  if (to.meta.requiresNoAuth && store.state.user_id != null) {
    next('/')
    return
  }

  if (to.path.startsWith('/admin')) {
    await import('./assets/admin.css')
  } else {
    await import('./assets/main.css')
  }

  next()
})

const app = createApp(App)
app.use(router)
app.use(VueToast, {
  position: 'top-right'
})
app.use(store)
app.mount('#app')
