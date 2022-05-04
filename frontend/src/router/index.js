import { createRouter, createWebHashHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfilView from '../views/ProfilView.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const routes = [
{
  path: "/AccueilView",
  component: AccueilView,
},
{
  path: "/LoginView",
  component: LoginView,
},
{
  path: "/",
  component: SignupView,
},
{
  path: "/ProfilView",
  component: ProfilView,
},
{
path: "/:catchAll(.*)",
component: NotFoundPage,
},



 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
