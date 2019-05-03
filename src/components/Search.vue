<template>
<div class="container">
  <h1>年報一覧</h1>

  <table class="table mx-auto w-50">
    <tbody>
    <tr>
      <td>タイトル</td>
      <td>
        <input type="text" class="form-control" @change="search" @keyup="search" v-model="title" placeholder="アサイン初日">
      </td>
    </tr>
    <tr>
      <td>グループ</td>
      <td>
        <select @change="search" v-model="groupId" class="form-control">
          <option value="" selected>選択しない</option>
          <option v-for="(group, index) in groups" :key="index" :value="group.id">
            {{group.value}}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>氏名</td>
      <td>
        <input type="text" class="form-control" @change="search" @keyup="search" v-model="userName" placeholder="田中太郎">
      </td>
    </tr>
    <tr>
      <td>対象年度</td>
      <td>
        <select @change="search" v-model="targetYear" class="form-control">
          <option value="" selected>選択しない</option>
          <option v-for="(year, index) in years" :key="index" :value="year">
            {{year}}年
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <!-- TODO 複数選択 -->
      <td>使用した技術</td>
      <td>
        <input type="text" class="form-control" value="" list="tag-list" @change="search" v-model="tag" placeholder="Java">
        <datalist id="tag-list">
          <option v-for="(tag, index) in tags" :key="index" :value="tag.value">
            {{tag.value}}
          </option>
        </datalist>
      </td>
    </tr>
    <tr>
      <!-- TODO 複数選択 -->
      <td>担当した工程</td>
      <td>
        <select @change="search" v-model="processId" class="form-control">
          <option value="0" selected>選択しない</option>
          <option v-for="(process, index) in processes" :key="index" :value="process.id">
            {{process.value}}
          </option>
        </select>
      </td>
    </tr>
    </tbody>
  </table>

  <!-- TODO 条件のクリア機能 -->
  <!-- TODO 並び替え機能 -->
  <!-- TODO 件数表示 -->
  <!-- TODO ページネーション機能かもっと見るボタン -->

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

      axios
        // TODO ドメインを環境ごとに切り分ける
        .post('http://localhost:8090/api/v1/article/search', params, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
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
        // TODO ドメインを環境ごとに切り分ける
        .get('http://localhost:8090/api/v1/article/getConds', {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
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
