import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Search from '@/components/Search'
import Login from '@/components/Login'
import UserRegister from '@/components/UserRegister'
import UserDetail from '@/components/UserDetail'
import axios from 'axios'
import {API_URL} from './../constant/App'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    },
    {
      path: '/articles',
      name: 'search',
      component: Search,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/user/detail/:id',
      name: 'UserDetail',
      component: UserDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios
      .post(API_URL.AUTH + '/init', {}, {
        xsrfHeaderName: 'X-XSRF-TOKEN',
        withCredentials: true
      })
      .then(function (response) {
        if (response.data) {
          next()
        } else {
          localStorage.removeItem('userName')
          router.push('/login')
        }
      })
      .catch((res) => {
        localStorage.removeItem('userName')
        router.push('/login')
      })
  } else {
    next()
  }
})

export default router
