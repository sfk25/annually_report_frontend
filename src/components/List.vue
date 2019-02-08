<template>
<div class="container">
  <h1>記事一覧</h1>

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
import axios from 'axios'

export default {
  name: 'List',
  data () {
    return {
      articles: null
    }
  },
  mounted () {
    axios
      .get('http://localhost:7000/api/v1/articles')
      .then(
        response => (this.articles = response.data)
      )
      .catch((res) => {
        console.log('error')
        console.error(res)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h1 {
  border-bottom: 1px solid #eeeeee;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
