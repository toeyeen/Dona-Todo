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
