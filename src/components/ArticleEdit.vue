<template>
<div class="container">
  <h1 v-if="isRegister === 'true'">年報登録</h1>
  <h1 v-else>年報編集</h1>
  <table class="table mx-auto w-75">
    <tbody>
    <tr>
      <th>対象年度</th>
      <td>
        <select v-model="article.createdYear" class="form-control">
          <option value="">選択しない</option>
          <option v-for="(year, index) in years" :key="index" :value="year">
            {{year}}年
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <th>タイトル</th>
      <td>
        <input type="text" class="form-control" v-model="article.title" placeholder="アサイン初日">
      </td>
    </tr>
    <tr>
      <!-- TODO 複数選択 -->
      <th>使用した技術</th>
      <td>
        <input type="text" class="form-control" value="" list="tag-list" v-model="article.tag" placeholder="Java">
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
        <select v-model="article.processId" class="form-control">
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
              <textarea class="write" :value="article.content" @input="update"></textarea>
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
  <button class="btn btn-dark" @click="register" v-bind:disabled="disabledRegister">
    <span v-if="isRegister === 'true'">登録</span>
    <span v-else>更新</span>
  </button>
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
  props: {
    isRegister: String,
    createdYear: '',
    title: String,
    tag: String,
    processId: String,
    content: String,
    reviewLastYear: String,
    goalNextYear: String
  },
  data () {
    return {
      /** 入力内容 */
      article: {
        // createdYear: this.createdYear,
        // title: this.title,
        // tag: this.tag,
        // processId: this.processId,
        // content: this.content,
        // reviewLastYear: this.reviewLastYear,
        // goalNextYear: this.goalNextYear
        createdYear: '',
        title: '',
        tag: '',
        processId: '',
        content: '',
        reviewLastYear: '',
        goalNextYear: ''
      },
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
      return marked(this.article.content, { sanitize: true })
    }
  },
  mounted () {
    this.getConds()
    // これはしょうがない
    setTimeout(function () {
      this.article.createdYear = this.createdYear
      this.article.title = this.title
      this.article.tag = this.tag
      this.article.processId = this.processId
      this.article.content = this.content
      this.article.reviewLastYear = this.reviewLastYear
      this.article.goalNextYear = this.goalNextYear
    }.bind(this), 1000)
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
      this.article.content = e.target.value
    }, 300),
    register: function () {
      // TODO 親から制御する
      this.disabledRegister = true
      // TODO エラーメッセージも親から制御する
      this.$emit('save', this.article)
      this.disabledRegister = false
      // let params = {
      //   createdYear: this.createdYear,
      //   title: this.title,
      //   tag: this.tag,
      //   processId: this.processId,
      //   content: this.content
      // }
      // axios
      //   .post(API_URL.ARTICLE + '/register', params, {
      //     xsrfHeaderName: 'X-XSRF-TOKEN',
      //     withCredentials: true
      //   })
      //   .then(function (response) {
      //     console.log(response)
      //   })
      //   .catch((res) => {
      //     console.error(res)
      //     this.errorMessage = res.response.data.message
      //   })
      //   .finally(function () {
      //     this.disabledRegister = false
      //   }.bind(this))
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
.table {
  min-width: 750px;
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
