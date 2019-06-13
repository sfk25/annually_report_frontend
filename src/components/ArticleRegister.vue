<template>
<div class="container">
  <h1>年報登録</h1>
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
        <div id="editor">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a href="#write" class="nav-link active" data-toggle="tab">Write</a>
            </li>
            <li class="nav-item">
              <a href="#preview" class="nav-link" data-toggle="tab">Preview</a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="write" class="tab-pane active">
              <textarea class="write" :value="content" @input="update"></textarea>
            </div>
            <div id="preview" class="tab-pane">
              <div class="preview" v-html="compiledMarkdown"></div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <!-- TODO 今年の振り返り -->
    <!-- TODO 来年の目標 -->
    </tbody>
  </table>
  <button class="btn btn-dark" @click="register" v-bind:disabled="disabledRegister">登録</button>
  <div class="text-danger error">{{errorMessage}}</div>
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
      /** ボタン制御 */
      disabledRegister: false,
      /** エラーメッセージ */
      errorMessage: ''
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
    register: function () {
      this.disabledRegister = true
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
          console.log(response)
        })
        .catch((res) => {
          console.error(res)
          this.errorMessage = res.response.data.message
        })
        .finally(function () {
          this.disabledRegister = false
        }.bind(this))
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
#editor {
  vertical-align: top;
  max-width: 600px;
  padding: 0 20px;
  text-align: start;
}
.write {
  resize: both;
  width: 600px;
  height: 300px;
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
  width: 600px;
  border: 1px solid #dee2e6;
  overflow: scroll;
  word-wrap:break-word;
  padding: 10px;
}
.nav-tabs {
  border-bottom: none;
}
.nav-link {
  color: #495057;
}
</style>
