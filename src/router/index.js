import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'
import App from '../App.vue'
import LoginView from '../views/user/LoginView.vue'
import AlumnoView from '../views/admin/alumno/AlumnoView.vue'
import ProfesorView from '../views/admin/profesor/ProfesorView.vue'
import ApoderadoView from '../views/admin/apoderado/ApoderadoView.vue'

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: App,
    meta: {requireAtuh: true},
    children: [
      {
        path: 'alumno',
        name: 'Alumno',
        component: AlumnoView
      },
      {
        path: 'profesor',
        mane: 'Profesor',
        component: ProfesorView
      },
      {
        path: 'apoderado',
        name: 'Apoderado',
        component: ApoderadoView
      }      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAtuh) 
  {
    if(store.getters.estaAutenticado != null)
    {
      next()
    }
    next("/login")
  }
  next()
});

export default router
