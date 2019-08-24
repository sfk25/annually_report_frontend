<template>
    <div class="container">

      <h1>プロフィール</h1>

      <div v-if="loginUserId == detailUserId">
        <router-link :to="{name: 'UserUpdate', params: {id : detailUserId}}">
          プロフィール編集
        </router-link>
      </div>

      <table class="user-detail table table-bordered table-hover mx-auto w-75">
        <tbody>
        <tr>
          <td class="table-active">グループ</td>
          <td v-if="user.groupId === group.id" v-for="(group, index) in groups" :key="index">
            {{group.value}}
          </td>
        </tr>
        <tr>
          <td class="table-active">名前</td>
          <td>{{user.name}}</td>
        </tr>
        <tr>
          <td class="table-active">メールアドレス</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td class="table-active">入社日</td>
          <td>{{formatDate(this.user.enteringCompanyDate)}}</td>
        </tr>
        <tr>
          <td class="table-active">性別</td>
          <td>{{sexTypes[user.sex]}}</td>
        </tr>
        <tr>
          <td class="table-active">血液型</td>
          <td>{{bloodTypes[user.bloodType]}}</td>
        </tr>
        <tr>
          <td class="table-active">誕生日</td>
          <td>{{formatDate(this.user.birthday)}}</td>
        </tr>
        <tr>
          <td class="table-active">自己紹介</td>
          <td>{{user.selfIntroduction}}</td>
        </tr>
        </tbody>
      </table>
      </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {API_URL, BLOOD_TYPES, SEX_TYPES} from './../constant/App'

export default {
  name: 'User',
  data () {
    return {
      loginUserId: 0,
      detailUserId: 0,
      user: {
        id: '',
        name: '',
        email: '',
        groupId: '',
        enteringCompanyDate: '',
        sex: '',
        bloodType: '',
        birthday: '',
        selfIntroduction: ''
      },
      groups: {},
      bloodTypes: BLOOD_TYPES,
      sexTypes: SEX_TYPES
    }
  },
  methods: {
    getArticleDetail: function () {
      axios
        .get(API_URL.USER + '/detail/' + this.detailUserId, {
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
          this.errorMessage = res.response.data.message
        })
    },
    init: function () {
      this.detailUserId = this.$route.params.id
      this.loginUserId = localStorage.userId
      this.getArticleDetail()
      this.getGroups()
    },
    formatDate: function (date) {
      return date != null
        ? moment(date).format('YYYY-MM-DD')
        : '未入力'
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.user-detail {
  max-width: 640px;
}
</style>
