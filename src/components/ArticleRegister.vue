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
      <th>対象年度</th>
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
      <th>タイトル</th>
      <td>
        <input type="text" class="form-control" v-model="title" placeholder="アサイン初日">
      </td>
    </tr>
    <tr>
      <!-- TODO 複数選択 -->
      <th>使用した技術</th>
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
      <th>担当した工程</th>
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
      <th>業務内容</th>
      <td>
        <ul>
          <li @click="changeIsWrite(true)">Write</li>
          <li @click="changeIsWrite(false)">Preview</li>
        </ul>
        <div id="editor">
          <textarea v-if="isWrite" :value="content" @input="update"></textarea>
          <div v-if="!isWrite" class="preview" v-html="compiledMarkdown"></div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <button class="btn btn-dark" @click="register">登録</button>
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
    changeIsWrite: function (isWrite) {
      this.isWrite = isWrite
    },
    register: function () {
      let params = {
        targetYear: this.targetYear,
        title: this.title,
        tag: this.tag,
        processId: this.processId,
        content: this.content
      }
      axios
        .post(API_URL.ARTICLE + '/register', params, {
          xsrfHeaderName: 'X-XSRF-TOKEN',
          withCredentials: true
        })
        .then(function (response) {
          console.log('SUCCESS!!!')
          console.log(response)
        })
        .catch((res) => {
          console.log('ERROR!!!!')
          console.error(res)
        })
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
.table th {
  width: 150px;
}
.table td {
  text-align: left;
  width: 550px;
}
textarea, #editor div {
  display: inline-block;
  width: 100%;
  height: 200px;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
  text-align: start;
}
/* TODO resizeを使えばサイズを可変できる? */
textarea {
  resize: none;
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
.preview {
  border: 1px solid #dee2e6;
  overflow: scroll;
}
</style>
