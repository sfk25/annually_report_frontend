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

    <button class="btn btn-dark" @click="login">ログイン</button>
    <div class="text-danger error" v-if="isFailedLogin">ログインに失敗しました</div>

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
      password: '',
      isFailedLogin: false
    }
  },
  methods: {
    login: function () {
      let params = {
        email: this.email,
        password: this.password
      }
      axios
        // TODO ドメインを環境ごとに切り分ける
        // TODO 設定をどこかでまとめる
        .post('http://localhost:8090/api/v1/auth/login', params, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          // ローカルストレージにユーザー名を設定
          localStorage.userName = response.data.name
          // ヘッダーにユーザー名を設定する
          this.$emit('setUserName')
          router.push('/')
        }.bind(this))
        .catch((res) => {
          console.error(res)
          this.isFailedLogin = true
        }).bind(this)
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
.error {
  margin-top: 10px;
}
</style>
