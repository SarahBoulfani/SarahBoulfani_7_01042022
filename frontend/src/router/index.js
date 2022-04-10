import { createRouter, createWebHashHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

const routes = [
{
  path: "/",
  component: AccueilView,
},
{
  path: "/LoginView",
  component: LoginView,
},
{
  path: "/SignupView",
  component: SignupView,
}
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
