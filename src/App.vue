<template>
  <div id="app">
    <Header ref="header"></Header>
    <router-view @setUserHeader="setUserHeader"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    // ヘッダーにユーザー名を設定する（ログイン完了時に呼ばれる）
    setUserHeader: function () {
      this.$refs.header.setUserHeader()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 0 150px 0;
}
</style>
