<template>
<div class="container">
  <h1>年報一覧</h1>

  <h2>検索条件</h2>

  <table class="hoge">
    <tbody>
    <tr>
      <td>タイトル</td>
      <td><input type="text" @change="search" @keyup="search" v-model="title"></td>
    </tr>
    <tr>
      <td>グループ名</td>
      <td>
        <select @change="search" v-model="groupId">
          <option v-for="(group, index) in groups" :key="index" :value="index">
            {{group.value}}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>氏名</td>
      <td><input type="text" @change="search" @keyup="search" v-model="userName"></td>
    </tr>
    <tr>
      <td>対象年度</td>
      <td>
        <select @change="search" v-model="targetYear">
          <option value="" selected>選択しない</option>
          <option v-for="(year, index) in years" :key="index">
            {{year}}年
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>使用した技術</td>
      <td>
        <input type="text" value="" list="tag-list" @change="search" v-model="tag">
        <datalist id="tag-list">
          <option v-for="(tag, index) in tags" :key="index" :value="tag.value">
            {{tag.value}}
          </option>
        </datalist>
      </td>
    </tr>
    <tr>
      <td>担当した工程</td>
      <td>
        <select @change="search" v-model="processId">
          <option value="0" selected>選択しない</option>
          <option v-for="(process, index) in processes" :key="index" :value="process.id">
            {{process.value}}
          </option>
        </select>
      </td>
    </tr>
    </tbody>
  </table>

  <list v-bind:articles="articles"></list>

</div>
</template>

<script>
import axios from 'axios'
import List from './Search/List'

export default {
  name: 'Search',
  data () {
    return {
      articles: [],
      // 指定した条件
      title: '',
      groupId: '',
      userName: '',
      targetYear: '',
      tag: '',
      processId: 0,
      // 表示する条件
      tags: [],
      groups: [],
      processes: [],
      years: []
    }
  },
  mounted () {
    this.search()
    this.getConds()
  },
  methods: {
    search: function () {
      let params = {
        title: this.title,
        groupId: this.groupId,
        userName: this.userName,
        targetYear: this.targetYear,
        tag: this.tag,
        processId: this.processId
      }

      console.log('-----Check params')
      console.log(params)

      axios
        // TODO ドメインを環境ごとに切り分けたい
        .post('http://localhost:8090/api/v1/article/search', params)
        .then(function (response) {
          this.articles = response.data
        }.bind(this))
        .catch((res) => {
          console.log('error')
          console.error(res)
        })
    },
    getConds: function () {
      axios
        .get('http://localhost:8090/api/v1/article/getConds')
        .then(function (response) {
          let data = response.data
          this.groups = data.groups
          this.processes = data.processes
          this.tags = data.tags
          this.years = data.years
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
