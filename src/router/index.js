import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import EventManagement from '../views/EventManagement.vue'
import PublicationsManagement from '../views/PublicationsManagement.vue'
import Staff from '../views/Staff.vue'
import Guests from '../views/Guests.vue'
import Mailings from '../views/Mailings.vue'
import NotFound from '../components/Error/NotFound.vue'
import Login from '../components/Auth/Login.vue'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard',
    meta: { requiresAuth: true }
  },
  {
    path: '/event-management',
    component: EventManagement,
    meta: { title: 'Lista wydarzeń', requiresAuth: true }
  },
  {
    path: '/publication-schedule',
    component: PublicationsManagement,
    meta: { title: 'Harmonogram publikacji', requiresAuth: true }
  },
  {
    path: '/members/staff',
    component: Staff,
    meta: { title: 'Członkowie', requiresAuth: true }
  },
  {
    path: '/members/guests',
    component: Guests,
    meta: { title: 'Goście', requiresAuth: true }
  },
  {
    path: '/mailings',
    component: Mailings,
    meta: { title: 'Maile', requiresAuth: true }
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/:any(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})

// 👇 Middleware logowania
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isAuthenticated = !!auth.token // lub auth.user

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if ((to.name === 'login') && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router