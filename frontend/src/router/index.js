import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import LoginPage from '../views/LoginPage.vue'
import MePage from '../views/MePage.vue'
import Dashboard from '../views/Dashboard.vue'
import DocGiaPage from '../views/DocGiaPage.vue'
import SachPage from '../views/SachPage.vue'
import NhaXuatBanPage from '../views/NhaXuatBanPage.vue'
import NhanVienPage from '../views/NhanVienPage.vue'
import MuonSachPage from '../views/MuonSachPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'


const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { guestOnly: true }
  },
  {
    path: '/me',
    name: 'me',
    component: MePage,
    meta: { requiresAuth: true }
  },

  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/docgia',
    name: 'doc-gia',
    component: DocGiaPage,
    meta: { requiresLibrarian: true }
  },
  {
    path: '/sach',
    name: 'sach',
    component: SachPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/nhanvien',
    name: 'nhan-vien',
    component: NhanVienPage,
    meta: { requiresAdmin: true }
  },
  {
    path: '/nhaxuatban',
    name: 'nha-xuat-ban',
    component: NhaXuatBanPage,
    meta: { requiresLibrarian: true }
  },
   {
    path: '/muonsach',
    name: 'muon-sach',
    component: MuonSachPage,
    meta: { requiresLibrarian: true }
  },

  // 404 Not Found
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isNhanVienLoaded) {
    try {
      await authStore.fetchCurrentNhanVien()
    } catch (error) {
      console.error("Error fetching user:", error)
      authStore.logout()
    }
  }

  if (to.meta.requiresAuth && !authStore.nhanVien) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  next()
})

export default router