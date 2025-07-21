import { createRouter, createWebHistory } from 'vue-router'

// Eagerly imported views
import LandingPage from '../views/LandingPage.vue'
import AuthPage from '../views/AuthPage.vue'
import HomePage from '../views/HomePage.vue'
import RemediesPage from '../views/RemediesPage.vue'
import DoctorsPage from '../views/DoctorsPage.vue'
import Dashboard from '../views/Dashboard.vue'
import DietPlansPage from '../views/DietPlans.vue'
import AppointmentPage from '../views/AppointmentPage.vue'
import Notification from '../views/Notification.vue'
import Saved from '../views/Saved.vue'
import Schedule from '../views/Schedule.vue'
import ResetPassword from '../components/ResetPassword.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/remedies',
    name: 'Remedies',
    component: RemediesPage,
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: DoctorsPage,
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: AppointmentPage,
  },
  {
    path: '/diet',
    name: 'DietPlans',
    component: DietPlansPage,
  },
  {
    path: '/saved',
    name: 'Saved',
    component: Saved,
  },
  
//   {
//   path: '/forgot-password',
//   name: 'ForgotPassword',
//   component: () => import('../components/ForgotPassword.vue')  // adjust path if needed
// },


  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
