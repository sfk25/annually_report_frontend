<template>
  <article-edit
    :isRegister="isRegister"
    createdYear=''
    title=""
    tag=""
    processId='0'
    content=""
    :disabledRegister="disabledRegister"
    :errorMessage="errorMessage"
    @save="register"
  >
  </article-edit>
</template>

<script>
import axios from 'axios'
import router from '../router'
import {API_URL} from './../constant/App'
import ArticleEdit from './ArticleEdit'

export default {
  name: 'ArticleRegister',
  components: {
    'article-edit': ArticleEdit
  },
  data () {
    return {
      isRegister: true,
      disabledRegister: false,
      errorMessage: ''
    }
  },
  methods: {
    register: function (article) {
      this.disabledRegister = true
      let params = {
        createdYear: article.createdYear,
        title: article.title,
        tag: article.tag,
        processId: article.processId,
        content: article.content
      }
      axios
        .post(API_URL.ARTICLE + '/register', params, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          this.errorMessage = ''
          if (window.confirm('登録が完了しました')) {
            router.push('/article/detail/' + response.data)
          }
        }.bind(this))
        .catch((res) => {
          this.errorMessage = res.response.data.message
        })
        .finally(function () {
          this.disabledRegister = false
        }.bind(this))
    }
  }
}
</script>

<style scoped>

</style>
