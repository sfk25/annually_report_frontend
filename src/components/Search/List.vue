<template>
<div>
  <!-- モーダルサンプル -->
  <button v-on:click="show">show!</button>
  <modal name="user-detail" :width="300" :heigth="300">
    <p>hello, world!</p>
    <button v-on:click="hide">hide</button>
  </modal>

  <h2>検索結果</h2>
  <table class="table table-bordered table-hover">
    <thead>
    <tr class="table-active">
      <td>タイトル</td>
      <td>グループ</td>
      <td>氏名</td>
      <td>使用した技術</td>
      <td>担当した工程</td>
      <td>年度</td>
      <td>投稿日</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(article, key, index) in articles" :key="index">
      <td>{{article.title}}</td>
      <td>{{article.groupName}}</td>
      <td>{{article.userName}}</td>
      <td>
        <span v-for="(value, index) in article.tags" :key="index">
          {{value}}
        </span>
      </td>
      <td>
        <span v-for="(value, index) in article.processes" :key="index">
          {{value}}
        </span>
      </td>
      <td>{{article.createdYear}}年</td>
      <td>{{article.createdAt}}</td>
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
    // サンプルメソッド追加
    show: function () {
      this.$modal.show('user-detail')
    },
    hide: function () {
      this.$modal.hide('user-detail')
    }
  }
}
</script>

<style scoped>

</style>
