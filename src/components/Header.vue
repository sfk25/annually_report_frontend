<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Annually Report</router-link>
      <div class="dropdown" v-if="this.userName !== ''">
        <button type="button" class="btn btn-secondary dropdown-toggle"
                id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{userName}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu">
          <button class="dropdown-item" type="button">プロフィール</button>
          <button class="dropdown-item" type="button">パスワード変更</button>
          <button class="dropdown-item" type="button" @click="logout">ログアウト</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'Header',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    logout: function () {
      axios
      // TODO ドメインを環境ごとに切り分ける
        .post('http://localhost:8090/api/v1/auth/logout', {}, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          // TODO Vue側のユーザー情報削除
          router.push('login')
          this.userName = ''
          localStorage.removeItem('userName')
        }.bind(this))
        .catch((res) => {
          console.error(res)
        })
    }
  },
  mounted () {
    console.log(localStorage.userName)
    this.userName = localStorage.userName
  }
}
</script>

<style scoped>
.navbar {
  margin-bottom: 30px;
}
.navbar-brand {
  margin-left: 30px;
}
.dropdown {
  margin-right: 100px;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
