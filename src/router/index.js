import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Blog from '@/views/Blog.vue'
import FAQ from '@/views/FAQ.vue'
import Login from '@/views/Auth/Login.vue'
import Registration from '@/views/Auth/Registration.vue'
import ForgotPassword from '@/views/Auth/ForgotPassword.vue'
import VerifyOTP from '@/views/Auth/VerifyOTP.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'
import Dashboard from '@/views/Admin/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about-us',
      name: 'About',
      component: About
    },
    {
      path: '/contact-us',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Registration
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/verify-otp',
      name: 'VeriftOTP',
      component: VerifyOTP
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
