<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Annually Report</router-link>
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
          // プロパティとローカルストレージからユーザー名を削除する
          this.userName = ''
          localStorage.removeItem('userName')
          // ログイン画面に遷移
          router.push('login')
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
.dropdown {
  margin-right: 200px;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
