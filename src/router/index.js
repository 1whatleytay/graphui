import Vue from 'vue'
import VueRouter from 'vue-router'

import Builder from '@/views/Builder'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Builder',
    component: Builder
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router