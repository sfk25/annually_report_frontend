<template>
  <div class="container">

    <h2>グループ一覧</h2>

    <table class="table table-bordered table-hover mx-auto w-75">
      <tbody>
      <tr v-for="(group, index) in groups" :key="index">
        <td data-toggle="collapse" :data-target="'#group' + group.id" aria-expanded="false">
          {{group.value}}
          <div :id="'group' + group.id" class="card card-body collapse">
            <div v-if="group.members == null">
              メンバーがいません
            </div>
            <div v-else v-for="(member, index2) in group.members" :key="index2">
              <a href="#" @click="profile(member.id)">{{member.name}}</a>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import {API_URL} from './../constant/App'

export default {
  name: 'GroupList',
  data () {
    return {
      groups: {}
    }
  },
  methods: {
    profile: function (userId) {
      router.push('/user/detail/' + userId)
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
      this.getGroups()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
