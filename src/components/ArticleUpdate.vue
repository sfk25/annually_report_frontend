<template>
  <article-edit
    isRegister=false
    :createdYear="article.createdYear"
    :title="article.title"
    :tag="article.tags[0]"
    :processId=article.processes[0]
    :content="article.value"
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
      }
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
      console.log('KKKK')
      console.log(article)
      // TODO 更新
    }
  },
  created () {
    this.getArticleDetail()
  }
}
</script>

<style scoped>

</style>
