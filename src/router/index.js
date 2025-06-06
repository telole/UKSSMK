import { createRouter, createWebHistory } from "vue-router"
import Login from "../components/Auth/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Kunjungan from "../views/Kunjungan.vue"
// import DetailKunjungan from "../components/Stuff/Detail-Kunjungans.vue"
import Artikel from "../views/Artikel.vue"
import BacaArtikel from "../components/Stuff/Baca.Artikel.vue"
import Consultations from "../views/Consultations.vue"
import { isAuthenticated } from "../configs/utils/Guard"
import DetailKonsultasi from "../components/Stuff/Detail-Konsultasi.vue"
import UrgentCalls from "../views/UrgentCalls.vue"
import AuthRegister from "../components/Auth/Auth.Register.vue"
import DashboardAdmin from "../components/Admin/views/Dashboard.admin.vue"
import DetailKunjungans from "../components/Stuff/Detail-Kunjungans.vue"
import DetailKunjungan from "../components/Admin/stuff/Detail.kunjungan.vue"
import Visiting from "../components/Admin/views/Visiting.vue"
import Obat from "../components/Admin/views/Obat.vue"
import ArticleAdmin from "../components/Admin/views/Article.admin.vue"
import Consultant from "../components/Admin/views/Consultant.vue"
import DetailConsultation from "../components/Admin/stuff/Detail.consultation.vue"
import UrgentCallsAdmin from "../components/Admin/views/UrgentCalls.admin.vue"
import DetailLaporan from "../components/Stuff/Detail-Laporan.vue"
import DetailAdminLaporan from "../components/Admin/stuff/Detail.Admin-Laporan.vue"

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  
  {
    path: '/register',
    name: 'reg',
    component: AuthRegister
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
    component: DetailKunjungans,
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
  {
    path: '/admin-dashboard',
    name: 'admin',
    component: DashboardAdmin,
    meta: { requiresAuth: true }
  },
  {
    path : '/details/:id',
    name : 'dtl',
    component : DetailKunjungan,
    meta : {requiresAuth : true}
  },
  {
    path : '/admin-kunjungan',
    name : 'knj',
    component : Visiting,
    meta : {requiresAuth : true}
  },
  {
    path : '/obat',
    name : 'pel',
    component : Obat,
    meta : {requiresAuth : true}
  },
  {
    path : '/admin-artikel',
    name : 'kkk',
    component : ArticleAdmin,
    meta : {requiresAuth : true}
  },
  {
    path : '/admin-konsultasi',
    name : 'akow',
    component : Consultant,
    meta : {requiresAuth : true}
  },
  {
    path : '/detail-consultant/:id',
    name : 'nenene',
    component : DetailConsultation,
    meta : {requiresAuth : true}
  },
    {
      path : '/Urgent-Callls',
      name : 'njakbwj',
      component : UrgentCallsAdmin,
      meta : {requiresAuth : true}
    },
    {
      path : '/Laporan/:id',
      name : 'jujujeje',
      component : DetailLaporan,
      meta : {requiresAuth : true}
    },
    {
      path : '/Detail-calls/:id',
      name : 'janjabe',
      component : DetailAdminLaporan,
      meta : {requiresAuth : true}
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
