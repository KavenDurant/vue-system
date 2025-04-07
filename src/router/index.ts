import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login-component.vue'),
    },
    {
      path: '/layouts',
      name: 'layouts',
      component: () => import('@/views/layouts/Layout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/layouts/HomeView.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/layouts/AboutView.vue'),
        },
        {
          path: '/articles',
          name: 'articles',
          component: () => import('@/views/layouts/Articles.vue'),
        },
      ],
    },
  ],
})

export default router
