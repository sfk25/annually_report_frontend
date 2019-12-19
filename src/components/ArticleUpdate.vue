<template>
  <article-edit
    v-if="isShow"
    :isRegister="isRegister"
    :createdYear="article.createdYear"
    :title="article.title"
    :tag="article.tags[0]"
    :processId=article.processes[0]
    :content="article.value"
    :disabledRegister="disabledRegister"
    :errorMessage="errorMessage"
    @save="update"
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
      errorMessage: '',
      isShow: false
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
          this.isShow = true
        }.bind(this))
        .catch((res) => {
          console.error(res)
        })
    },
    update: function (article) {
      this.disabledRegister = true
      let params = {
        id: this.$route.params.id,
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
          this.errorMessage = ''
          window.confirm('更新が完了しました')
        }.bind(this))
        .catch((res) => {
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
