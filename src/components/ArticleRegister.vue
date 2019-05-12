<template>
<div class="container">
  <h1>年報登録</h1>

  <!-- 対象年度 -->
  <!-- タイトル -->
  <!-- 使用した技術 -->
  <!-- 担当した工程 -->
  <!-- 業務内容 -->
  <!-- 今年の振り返り -->
  <!-- 来年の目標 -->

  <table class="table mx-auto w-75">
    <tbody>
    <tr>
      <td>対象年度</td>
      <td>
        <select v-model="targetYear" class="form-control">
          <option value="" selected>選択しない</option>
          <option v-for="(year, index) in years" :key="index" :value="year">
            {{year}}年
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>タイトル</td>
      <td>
        <input type="text" class="form-control" v-model="title" placeholder="アサイン初日">
      </td>
    </tr>
    <tr>
      <!-- TODO 複数選択 -->
      <td>使用した技術</td>
      <td>
        <input type="text" class="form-control" value="" list="tag-list" v-model="tag" placeholder="Java">
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
        <select v-model="processId" class="form-control">
          <option value="0" selected>選択しない</option>
          <option v-for="(process, index) in processes" :key="index" :value="process.id">
            {{process.value}}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>業務内容</td>
      <td>
        <ul>
          <li @click="hoge(true)">Write</li>
          <li @click="hoge(false)">Preview</li>
        </ul>
        <div id="editor">
          <textarea v-if="isWrite" :value="content" @input="update"></textarea>
          <div v-if="!isWrite" v-html="compiledMarkdown"></div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
import _ from 'lodash'
import {API_URL} from './../constant/App'

export default {
  name: 'ArticleRegister',
  data () {
    return {
      /** 入力内容 */
      targetYear: '',
      title: '',
      tag: '',
      processId: 0,
      content: '',
      reviewLastYear: '',
      goalNextYear: '',
      /** 選択項目 */
      years: [],
      processes: [],
      tags: [],
      /** 判定値 */
      isWrite: true
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.content, { sanitize: true })
    }
  },
  mounted () {
    this.getConds()
  },
  methods: {
    getConds: function () {
      axios
        .get(API_URL.ARTICLE + '/getConds', {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          let data = response.data
          this.processes = data.processes
          this.tags = data.tags
          this.years = data.years
        }.bind(this))
        .catch((res) => {
          console.log('error')
          console.error(res)
        })
    },
    // lodashを使用。0.3秒動きが止まったら実行される
    update: _.debounce(function (e) {
      this.content = e.target.value
    }, 300),
    hoge: function (fuga) {
      this.isWrite = fuga
    }
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
textarea, #editor div {
  display: inline-block;
  width: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
  text-align: start;
}
textarea {
  border: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}
code {
  color: #f66;
}
</style>
