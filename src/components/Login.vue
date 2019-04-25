<template>
  <div class="container">
    <h1>ログイン</h1>

    <table class="table mx-auto w-50">
      <tbody>
      <tr>
        <td>メールアドレス</td>
        <td>
          <input type="email" class="form-control" v-model="email" placeholder="hoge@domain.com">
        </td>
      </tr>
      <tr>
        <td>パスワード</td>
        <td>
          <input type="password" class="form-control" v-model="password" placeholder="password">
        </td>
      </tr>
      </tbody>
    </table>

    <button @click="login">ログイン</button>
    <button @click="logout">ログアウト</button>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let params = {
        email: this.email,
        password: this.password
      }
      axios
      // TODO ドメインを環境ごとに切り分けたい
        .post('http://localhost:8090/api/v1/auth/login', params, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          router.push('articles')
        })
        .catch((res) => {
          console.error(res)
        })
    },
    logout: function () {
      axios
      // TODO ドメインを環境ごとに切り分けたい
        .post('http://localhost:8090/api/v1/auth/logout', {}, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          // TODO Vue側のユーザー情報削除
        })
        .catch((res) => {
          console.error(res)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h1 {
  border-bottom: 1px solid #eeeeee;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
