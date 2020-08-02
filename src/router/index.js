import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store';

import Login from '../views/Login.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/Upload.vue'),
    // beforeEnter: (to, from, next) => {
    //   // ...
    // }
  },
  {
    path: '/gallary',
    name: 'Gallary',
    component: () => import('../views/Gallary.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.token) {
    next({ name: 'Login' })
  }
  else if (to.name === 'Login' && store.getters.token) {
    next({ name: 'Gallary' })
  }
  else {
    next()
  }
})

export default router
