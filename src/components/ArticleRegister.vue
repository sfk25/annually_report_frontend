<template>
  <article-edit
    isRegister=true
    createdYear=''
    title=""
    tag=""
    processId=0
    content=""
    @save="register"
  >
  </article-edit>
</template>

<script>
import ArticleEdit from './ArticleEdit'

export default {
  name: 'ArticleRegister',
  components: {
    'article-edit': ArticleEdit
  },
  methods: {
    register: function (article) {
      console.log('KKKK')
      console.log(article)
      // TODO 登録
    }
  }
}
</script>

<style scoped>

</style>
