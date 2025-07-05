import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import EventManagement from '../views/EventManagement.vue'
import PublicationsManagement from '../views/PublicationsManagement.vue'
import Members from '../views/Members.vue'
import Mailings from '../views/Mailings.vue'

const router = createRouter
({
  history: createWebHistory(),
  routes: [
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
        component: Dashboard
    },
    {   
        path: '/event-management',
        component: EventManagement,
        meta: { title: 'Lista wydarzeń' }
    },
    // {
    //     path: '/events/:id',
    //     name: 'EventDetails',
    //     component: () => import('../views/EventDetailsView.vue'),
    //     meta: { title: 'Szczegóły wydarzenia' }
    // },
    {
        path: '/publication-schedule',
        component: PublicationsManagement,
        meta: { title: 'Harmonogram publikacji' }
    },
    {
        path: '/members',
        component: Members,
        meta: { title: 'Członkowie' }
    },
        {
        path: '/mailings',
        component: Mailings,
        meta: { title: 'Maile' }
    }
  ]
})

export default router