<template>
    <div class="container">

      <h2>プロフィール</h2>

      <table class="user-detail table table-bordered table-hover mx-auto w-75">
        <tbody>
        <tr>
          <td>グループ</td>
          <td>{{user.groupName}}</td>
        </tr>
        <tr>
          <td>名前</td>
          <td>{{user.name}}</td>
        </tr>
        <tr>
          <td>メールアドレス</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td>入社日</td>
          <td>{{user.enteringCompanyDate}}</td>
        </tr>
        <tr>
          <td>性別</td>
          <td>{{user.sex}}</td>
        </tr>
        <tr>
          <td>血液型</td>
          <td>{{user.bloodType}}</td>
        </tr>
        <tr>
          <td>誕生日</td>
          <td>{{user.birthday}}</td>
        </tr>
        <tr>
          <td>自己紹介</td>
          <td>{{user.selfIntroduction}}</td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios'
import {API_URL} from './../constant/App'

export default {
  name: 'User',
  data () {
    return {
      user: {},
      errorMessage: ''
    }
  },
  methods: {
    getUserDetail: function () {
      let userId = this.$route.params.id
      axios
        .get(API_URL.USER + '/detail/' + userId, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          this.user = response.data
        }.bind(this))
        .catch((res) => {
          console.error(res)
          this.errorMessage = res.response.data.message
        })
    }
  },
  created () {
    this.getUserDetail()
  }
}
</script>

<style scoped>
.user-detail {
  max-width: 640px;
}
</style>
