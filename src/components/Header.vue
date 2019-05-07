<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Annually Report</router-link>
      <div class="user">
         <!-- ログイン状態 -->
        <div class="dropdown" v-if="userName !== '' && userName !== undefined">
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
        <!-- 未ログイン状態 -->
        <div v-else>
          <router-link to="/login" tag="button" class="btn btn-secondary">ログイン</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import {API_URL} from './../util/App'

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
        .post(API_URL.AUTH + '/logout', {}, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          // プロパティとローカルストレージからユーザー名を削除する
          this.userName = ''
          localStorage.removeItem('userName')
          router.push('/login')
        }.bind(this))
        .catch((res) => {
          console.error(res)
        })
    },
    // ユーザー名を設定する（ヘッダー表示時と、ログイン完了時に呼ばれる）
    setUserName: function () {
      this.userName = localStorage.userName
    }
  },
  created () {
    this.setUserName()
  }
}
</script>

<style scoped>
.navbar {
  margin-bottom: 30px;
}
.navbar-brand {
  margin-left: 200px;
}
.user {
  margin-right: 200px;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
