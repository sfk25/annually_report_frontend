<template>
<div>
  <h2>検索結果</h2>
  <table>
    <thead>
    <tr>
      <td>ID</td>
      <td>ユーザーID</td>
      <td>タイトル</td>
      <td>内容</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(article, key, index) in articles" :key="index">
      <td>{{article.id}}</td>
      <td>{{article.user_id}}</td>
      <td>{{article.title}}</td>
      <td>{{article.value}}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'List',
  // data () {
  //   return {
  //     articles: null
  //   }
  // },
  props: {
    articles: Array
  },
  methods: {
    assign: function (articles) {
      this.articles = articles
    }
  }
}
</script>

<style scoped>

</style>
