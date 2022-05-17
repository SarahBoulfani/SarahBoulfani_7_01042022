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
    meta: {
      title: "Accueil | Groupomania"
    }
  },
  {
    path: "/LoginView",
    component: LoginView,
    meta: {
      title: "Connexion | Groupomania"
    }
  },
  {
    path: "/",
    component: SignupView,
    meta: {
      title: "Inscription | Groupomania"
    }
  },
  {
    path: "/ProfilView",
    component: ProfilView,
    meta: {
      title: "Profil | Groupomania"
    }
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
    meta: {
      title: " 404 Not found"
    }
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router
