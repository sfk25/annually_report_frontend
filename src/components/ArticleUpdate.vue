<template>
  <article-edit
    :isRegister="isRegister"
    :createdYear="article.createdYear"
    :title="article.title"
    :tag="article.tags[0]"
    :processId=article.processes[0]
    :content="article.value"
    @save="update"
    :disabledRegister="disabledRegister"
    :errorMessage="errorMessage"
  >
  </article-edit>
</template>

<script>
import ArticleEdit from './ArticleEdit'
import axios from 'axios'
import {API_URL} from './../constant/App'

export default {
  name: 'ArticleRegister',
  components: {
    'article-edit': ArticleEdit
  },
  data () {
    return {
      isRegister: false,
      // loginUserId: 0,
      // detailUserId: 0,
      article: {
        userName: '',
        userId: '',
        createdYear: '',
        title: '',
        tags: [],
        processes: [],
        value: ''
      },
      disabledRegister: false,
      errorMessage: ''
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
          console.log(this.article)
          // console.log(this.loginUserId)
        }.bind(this))
        .catch((res) => {
          console.error(res)
        })
    },
    update: function (article) {
      this.disabledRegister = true
      console.log(article)
      let params = {
        createdYear: article.createdYear,
        title: article.title,
        tag: article.tag,
        processId: article.processId,
        content: article.content
      }
      axios
        .post(API_URL.ARTICLE + '/update', params, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          console.log(response)
          this.errorMessage = ''
        })
        .catch((res) => {
          console.error(res)
          this.errorMessage = res.response.data.message
        })
        .finally(function () {
          this.disabledRegister = false
        }.bind(this))
    }
  },
  created () {
    this.getArticleDetail()
  }
}
</script>

<style scoped>

</style>
