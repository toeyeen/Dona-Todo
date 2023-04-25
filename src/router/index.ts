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

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },

  {
    path: '/Feedback',
    name: 'Feedback',
    component: () => import('@/pages/Feedback.vue'),
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/Legal',
    name: 'Legal',
    component: () => import('@/pages/Legal.vue'),
  },
  {
    path: '/groups/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
