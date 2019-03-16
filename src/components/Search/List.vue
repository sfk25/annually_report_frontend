<template>
<div>
  <h2>検索結果</h2>
  <table>
    <thead>
    <tr>
      <!-- TODO グループ名、ユーザー名、タグ、工程、コメント数、いいね数 -->
      <td>タイトル</td>
      <td>年度</td>
      <td>投稿日</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(article, key, index) in articles" :key="index">
      <td>{{article.title}}</td>
      <td>{{article.created_year}}年</td>
      <td>{{article.updated_at}}</td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'List',
  props: {
    articles: Array
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
