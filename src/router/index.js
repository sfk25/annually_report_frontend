import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Search from '@/components/Search'
import Login from '@/components/Login'
import UserRegister from '@/components/UserRegister'
import axios from 'axios'
import {API_URL} from './../util/App'

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
          this.$emit('setUserName')
          router.push('/login')
        }
      }.bind(this))
      .catch((res) => {
        localStorage.removeItem('userName')
        this.$emit('setUserName')
        router.push('/login')
      })
  } else {
    next()
  }
})

export default router
