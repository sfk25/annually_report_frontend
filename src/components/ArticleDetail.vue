<template>
    <div class="container">

      <h1>年報詳細</h1>

      <div v-if="loginUserId == article.userId">
        <router-link :to="{ name : 'ArticleUpdate', params : {id : article.id} }">
          この年報を編集する
        </router-link>
      </div>

      <table class="table table-bordered table-hover mx-auto w-75">
        <tbody>
        <tr>
          <td class="table-active">ユーザー</td>
          <td>
            <router-link :to="{ name : 'UserDetail', params : {id : article.userId} }">
              {{article.userName}}
            </router-link>
          </td>
        </tr>
        <tr>
          <td class="table-active">年度</td>
          <td>{{article.createdYear}}年</td>
        </tr>
        <tr>
          <td class="table-active">タイトル</td>
          <td>{{article.title}}</td>
        </tr>
        <tr>
          <td class="table-active">使用した技術</td>
          <td>
            <span v-for="(value, index) in article.tags" :key="index">
            {{value}}
          </span>
          </td>
        </tr>
        <tr>
          <td class="table-active">担当した工程</td>
          <td>
            <div v-for="(value, index) in article.processes" :key="index">
              <span v-if="value == process.id" v-for="(process, index2) in processes" :key="index2">
                {{process.value}}
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="table-active">業務内容</td>
          <td>
            <div class="preview">
              <div class="tab-pane">
                <div class="content" v-html="compiledMarkdown"></div>
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
import marked from 'marked'
import {API_URL} from './../constant/App'

export default {
  name: 'User',
  data () {
    return {
      loginUserId: 0,
      detailUserId: 0,
      article: {
        id: 0,
        userName: '',
        userId: '',
        createdYear: '',
        title: '',
        tags: [],
        processes: [],
        value: ''
      },
      groups: [],
      processes: []
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.article.value, { sanitize: true })
    }
  },
  methods: {
    getArticleDetail: function () {
      axios
        .get(API_URL.ARTICLE + '/detail/' + this.$route.params.id, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          this.article = response.data
        }.bind(this))
        .catch((res) => {
          console.error(res)
        })
    },
    getConds: function () {
      axios
        .get(API_URL.ARTICLE + '/getConds', {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          let data = response.data
          this.processes = data.processes
        }.bind(this))
        .catch((res) => {
          console.log('error')
          console.error(res)
        })
    },
    init: function () {
      this.loginUserId = localStorage.userId
      this.getArticleDetail()
      this.getConds()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
table {
  text-align: start;
}
.preview {
  width: 600px;
}
.content {
  overflow: scroll;
  word-wrap:break-word;
  text-align: start;
}
</style>
