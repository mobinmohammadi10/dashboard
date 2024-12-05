import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CalendarView from '@/views/CalendarView.vue'
import SettingsView from '@/views/SettingsView.vue'
import FaqView from '@/views/FaqView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LoginPage from '@/views/LoginPage.vue'
import AdminCalendarView from '@/views/AdminCalendarView.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import UserManagementView from '@/views/UserManagementView.vue'
import RequestPage from '@/views/RequestPage.vue'
import ForgotView from '@/views/ForgotView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/admincalendar',
      name: 'adminCalendar',
      component: AdminCalendarView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage
    },
    {
      path: '/usermanagement',
      name: 'usermanagement',
      component: UserManagementView
    },
    {
      path: '/requestpage',
      name: 'requestpage',
      component: RequestPage
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotView
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPasswordView
    }
  ]
})

export default router
