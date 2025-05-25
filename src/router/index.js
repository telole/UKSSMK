import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Kunjungan from "../views/Kunjungan.vue"
import DetailKunjungan from "../components/Stuff/Detail-Kunjungan.vue"
import Artikel from "../views/Artikel.vue"
import BacaArtikel from "../components/Stuff/Baca.Artikel.vue"
import Consultations from "../views/Consultations.vue"
import { isAuthenticated } from "../configs/utils/Guard"
import DetailKonsultasi from "../components/Stuff/Detail-Konsultasi.vue"
import UrgentCalls from "../views/UrgentCalls.vue"

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/kunjungan',
    name: 'kunjungan',
    component: Kunjungan,
    meta: { requiresAuth: true }
  },
  {
    path: '/kunjungan/:id',
    name: 'detail',
    component: DetailKunjungan,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/artikel',
    name: 'artikel',
    component: Artikel,
    meta: { requiresAuth: true }
  },
  {
    path: '/artikel/:id',
    name: 'baca',
    component: BacaArtikel,
    meta: { requiresAuth: true }
  },
  {
    path: '/konsultasi',
    name: 'konsultasi',
    component: Consultations,
    meta: { requiresAuth: true }
  },
  {
    path: '/konsultasi/:id',
    name: 'konsultasion',
    component: DetailKonsultasi,
    meta: { requiresAuth: true }
  },
  {
    path: '/Laporan',
    name: 'laporan',
    component: UrgentCalls,
    meta: { requiresAuth: true }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    alert('Silahkan Login Dahulu')
    next('/')
  } else {
    next()
  }
})

export default router
