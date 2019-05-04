import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Login from '@/components/Login'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios
      .post('http://localhost:8090/api/v1/auth/init', {}, {
        xsrfHeaderName: 'X-XSRF-TOKEN',
        withCredentials: true
      })
      .then(function (response) {
        if (response.data) {
          next()
        } else {
          router.push('/login')
        }
      })
      .catch((res) => {
        router.push('/login')
      })
  } else {
    next()
  }
})

export default router
