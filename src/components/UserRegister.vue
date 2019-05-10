<template>
  <div class="container">
    <h1>ユーザー新規登録</h1>

    <table class="table mx-auto w-50">
      <tbody>
      <tr>
        <td>名前</td>
        <td>
          <input type="name" class="form-control" v-model="name" placeholder="太郎">
        </td>
      </tr>
      <tr>
        <td>メールアドレス</td>
        <td>
          <input type="email" class="form-control" v-model="email" placeholder="taro@domain.co.jp">
        </td>
      </tr>
      <tr>
        <td>グループ</td>
        <td>
          <select v-model="groupId" class="form-control">
            <option value="" selected>グループ</option>
            <option v-for="(group, index) in groups" :key="index" :value="group.id">
              {{group.value}}
            </option>
          </select>
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

    <button class="btn btn-dark" @click="register">登録</button>
    <div class="text-danger error">{{errorMessage}}</div>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import {API_URL} from './../constant/App'

export default {
  name: 'Login',
  data () {
    return {
      // グループ一覧
      groups: {},
      // 登録情報
      name: '',
      email: '',
      password: '',
      groupId: '',
      // エラーメッセージ
      errorMessage: ''
    }
  },
  methods: {
    register: function () {
      let params = {
        name: this.name,
        email: this.email,
        password: this.password,
        groupId: this.groupId
      }
      axios
        .post(API_URL.USER + '/register', params, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          console.log(response)
          alert('登録が完了しました')
          router.push('/login')
        })
        .catch((res) => {
          console.error(res)
          this.errorMessage = res.response.data.message
        })
    },
    getGroups: function () {
      axios
        .get(API_URL.GROUP, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          this.groups = response.data
        }.bind(this))
        .catch((res) => {
          console.error(res)
        })
    }
  },
  mounted () {
    this.getGroups()
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
