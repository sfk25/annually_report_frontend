<template>
<div class="container">
  <h1>年報一覧</h1>

  <h2>検索条件</h2>

  <table>
    <tbody>
    <tr>
      <td>タイトル</td>
      <td><input type="text" @change="search" @keyup="search" v-model="title"></td>
    </tr>
    <tr>
      <!-- TODO セレクトボックス -->
      <td>グループ名</td>
      <td><input type="text"></td>
    </tr>
    <tr>
      <td>氏名</td>
      <td><input type="text" @change="search" @keyup="search" v-model="userName"></td>
    </tr>
    <tr>
      <!-- TODO セレクトボックス -->
      <td>対象年</td>
      <td>
        <select>
          <option>選択しない</option>
        </select>
      </td>
    </tr>
    <tr>
      <!-- TODO セレクトボックス -->
      <td>使用した技術</td>
      <td><input type="text"></td>
    </tr>
    <tr>
      <!-- TODO セレクトボックス -->
      <td>担当した工程</td>
      <td><input type="text"></td>
    </tr>
    </tbody>
  </table>

  <list ref="list" v-bind="articles"></list>

</div>
</template>

<script>
import axios from 'axios'
import List from './Search/List'

export default {
  name: 'Search', // TODO 必要？
  data () {
    return {
      title: '',
      groupId: '',
      userName: '',
      targetYear: '',
      tagId: 0,
      processId: 0
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    search: function () {
      let params = {
        title: this.title,
        groupId: this.groupId,
        userName: this.userName,
        targetYear: this.targetYear,
        tagId: this.tagId,
        processId: this.processId
      }

      axios
        // TODO ドメインを環境ごとに切り分けたい
        .post('http://localhost:8090/api/v1/articles/search', params)
        .then(function (response) {
          console.log('Check data')
          console.log(response.data)
          this.$refs.list.assign(response.data)
        }.bind(this))
        .catch((res) => {
          console.log('error')
          console.error(res)
        })
    }
  },
  components: {
    list: List
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
