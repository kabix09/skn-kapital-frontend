import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import EventManagement from '../views/EventManagement.vue'
import PublicationsManagement from '../views/PublicationsManagement.vue'
import Members from '../views/Members.vue'
import Mailings from '../views/Mailings.vue'
import Tools from '../views/Tools.vue'

const router = createRouter
({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {   
        path: '/event-management',
        component: EventManagement
    },
    {
        path: '/publication-schedule',
        component: PublicationsManagement
    },
    {
        path: '/members',
        component: Members
    },
        {
        path: '/mailings',
        component: Mailings
    },
    {
        path: '/tools',
        component: Tools
    }
  ]
})

export default router