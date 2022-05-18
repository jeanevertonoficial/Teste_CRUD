import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Cadastro-usuario.vue')
  },
  {
    path: '/lista',
    name: 'listaCadastro',
    component: () => import( '../views/ListaCadastro.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
