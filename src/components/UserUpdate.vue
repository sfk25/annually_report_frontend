<template>
    <div class="container">

      <h2>プロフィール編集</h2>

      <table class="user-detail table table-bordered table-hover mx-auto w-75">
        <tbody>
        <tr>
          <td>グループ</td>
          <td>
            <select v-model="user.groupId" class="form-control">
              <option v-for="(group, index) in groups" :key="index" :value="group.id">
                {{group.value}}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>名前</td>
          <td>
            <input type="text" class="form-control" v-model="user.name">
          </td>
        </tr>
        <tr>
          <td>メールアドレス</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td>入社日</td>
          <td>{{formatDate(user.enteringCompanyDate, '未入力')}}</td>
        </tr>
        <tr>
          <td>性別</td>
          <td>
            <select v-model="user.sex" class="form-control">
              <option v-for="(value, index) in sexTypes" :value="index" :key="index">
                {{value}}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>血液型</td>
          <td>
            <select v-model="user.bloodType" class="form-control">
              <option v-for="(value, index) in bloodTypes" :value="index" :key="index">
                {{value}}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>誕生日</td>
          <td>
            <input type="date" class="form-control" v-model="user.birthday">
          </td>
        </tr>
        <tr>
          <td>自己紹介</td>
          <td>
            <textarea class="form-control" v-model="user.selfIntroduction"></textarea>
          </td>
        </tr>
        </tbody>
      </table>

      <button class="btn btn-dark" @click="update">更新</button>
      <div class="text-danger error">{{errorMessage}}</div>

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
      sexTypes: SEX_TYPES,
      errorMessage: ''
    }
  },
  methods: {
    update: function () {
      this.user.enteringCompanyDate = ''
      this.user.birthday = ''
      axios
        .post(API_URL.USER + '/update', this.user, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          this.errorMessage = ''
          alert('更新が完了しました')
        }.bind(this))
        .catch((res) => {
          console.error(res)
          this.errorMessage = res.response.data.message
        })
    },
    getUserDetail: function () {
      this.detailUserId = this.$route.params.id
      axios
        .get(API_URL.USER + '/detail/' + this.detailUserId, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          this.user = response.data
          this.user.birthday = this.formatDate(this.user.birthday, null)
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
    formatDate: function (date, substitute) {
      return date != null && date !== ''
        ? moment(date).format('YYYY-MM-DD')
        : substitute
    }
  },
  created () {
    this.getUserDetail()
    this.getGroups()
  }
}
</script>

<style scoped>
.user-detail {
  max-width: 640px;
}
</style>
