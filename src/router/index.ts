import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/completed',
    name: 'Completed',
    component: () => import('@/pages/Completed.vue'),
  },
  {
    path: '/Today',
    name: 'Today',
    component: () => import('@/pages/Today.vue'),
  },
  {
    path: '/groups/:id',
    name: 'Groups',
    component: () => import('@/pages/Groups.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
