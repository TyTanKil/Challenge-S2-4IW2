import { createApp, ref } from 'vue'
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
import AppQuiSommesNous from './views/AppQuiSommesNous.vue'
import AppContact from './views/AppContact.vue'

import Cart from './views/AppCart.vue'
import Success from './views/Payment/AppSuccess.vue'
import Cancel from './views/Payment/AppCancel.vue'

import { jwtDecode } from 'jwt-decode'
import VueToast from 'vue-toast-notification'

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

import PromotionList from './views/admin/AppPromotionList.vue'
import NewPromotion from './views/admin/AppAddPromotion.vue'
import EditPromotion from './views/admin/AppEditPromotion.vue'

import SearchResults from './views/AppSearchResults.vue'


import 'vue-toast-notification/dist/theme-sugar.css'
import AppMainView from './views/AppMainView.vue'
import EditOrder from './views/admin/AppEditOrder.vue'
import OrderList from './views/admin/AppOrderList.vue'

/* Footer */
import InfosLegales from './views/AppInformationsLegales.vue'
import AppCGV from './views/AppCGV.vue'
import AppDeclarationCookies from './views/AppDeclarationCookies.vue'
import AppDonneesPersonnelles from './views/AppDonneesPersonnelles.vue'

import 'vue-toast-notification/dist/theme-sugar.css'
import apiClient from './assets/js/apiClient';

const store = createStore({
  state() {
    return {
      api_endpoint: import.meta.env.VITE_API_ENDPOINT,
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
  { path: '/', component: AppMainView },
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

  { path: '/qui_sommes_nous', component: AppQuiSommesNous },
  { path: '/contact', component: AppContact },
  { path: '/admin', component: Admin },
  { path: '/admin/users', name: 'UserList', component: Users },
  { path: '/admin/products', name: 'ProductList', component: ProductList },
  { path: '/admin/product/new', name: 'AddProduct', component: NewProduct },
  { path: '/admin/product/edit/:id', name: 'EditProduct', component: EditProduct, props: true },
  { path: '/admin/promotions', name: 'PromotionList', component: PromotionList },
  { path: '/admin/promotions/new', name: 'AddPromotion', component: NewPromotion },
  { path: '/admin/promotions/edit/:id', name: 'EditPromotion', component: EditPromotion, props: true },
  { path: '/admin/category/new', name: 'AddCategory', component: NewCategory },
  { path: '/admin/category', name: 'CategoryList', component: CategoryList },
  { path: '/admin/category/edit/:id', name: 'EditCategory', component: EditCategory, props: true },
  { path: '/admin/manufacturers/new', name: 'AddManufacturer', component: NewManufacturer },
  { path: '/admin/manufacturers', name: 'ManufacturerList', component: ManufacturerList },
  {
    path: '/admin/manufacturer/edit/:id',
    name: 'EditManufacturer',
    component: EditManufacturer,
    props: true
  },
  { path: '/admin/users/edit/:id', name: 'EditUser', component: EditUser },
  { path: '/admin/users/edit/:id', name: 'EditUser', component: EditUser },
  { path: '/admin/order', name: 'OrderList', component: OrderList },
  { path: '/admin/order/edit/:id', name: 'EditOrder', component: EditOrder },

  { path: '/account', name: 'Account', component: MyAccount },

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
  { path: '/cart', component: Cart },
  { path: '/server-error', name: 'ServerError', component: ServerError },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/success', name: 'Success', component: Success },
  { path: '/cancel', name: 'Cancel', component: Cancel },
  { path: '/search', name: 'SearchResults', component: SearchResults },
  { path: '/informations_legales', name: 'InfosLegales', component: InfosLegales },
  { path: '/cgv', name: 'AppCGV', component: AppCGV },
  { path: '/declaration_cookies', name: 'DeclarationCookies', component: AppDeclarationCookies },
  { path: '/donnees_personnelles', name: 'DonneesPersonnelles', component: AppDonneesPersonnelles },
  
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})



const user = ref({});
const isAdmin = ref(false);

const fetchUserData = async () => {
  const userId = store.state.user_id;
  if(userId){
    try {
      const response = await apiClient.get(`/user/${userId}`);
      user.value = response;
      if (user.value.roles.includes('ROLE_ADMIN')) {
        isAdmin.value = true;
      } else {
        isAdmin.value = false;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur');
    }
  }
};


fetchUserData();

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
    if (store.state.user_id != null && isAdmin.value) {
      await import('./assets/admin.css');
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    await import('./assets/main.css');
    next();
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
