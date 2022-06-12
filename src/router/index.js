import Vue from 'vue'
import VueRouter from 'vue-router'
import OfficesPage from '../views/OfficesPage.vue'
import OfficesTest from '../views/OfficesTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'office page',
    component: OfficesPage
  },
  {
    path: '/officestest',
    name: 'office test',
    component: OfficesTest
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
