<template>
  <div class="container">
    <ul>
      <router-link to="/articles" tag="li">年報一覧</router-link>
      <router-link to="/article/register" tag="li">年報登録</router-link>
      <router-link to="/login" tag="li">ログイン</router-link>
      <router-link to="/user/register" tag="li">ユーザー新規登録</router-link>
      <router-link to="/groups" tag="li">グループ一覧</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {
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
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
