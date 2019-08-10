import {isDev} from './../util/App'

// *****************************************************************
// WEB API
// *****************************************************************
/** WEB API：ホスト */
const API_HOST = 'http://' + location.hostname + (isDev() ? ':8090' : '')
/** WEB API：エンドポイント */
const API_ENDPOINT = '/api/v1'
/** WEB API：URL */
const api = (url) => API_HOST + API_ENDPOINT + '/' + url

/** API API：URL */
export const API_URL = {
  AUTH: api('auth'),
  USER: api('user'),
  ARTICLE: api('article'),
  GROUP: api('group')
}

// *****************************************************************
// CONST
// *****************************************************************
export const BLOOD_TYPES = {
  0: 'A',
  1: 'B',
  2: 'O',
  3: 'AB'
}

export const SEX_TYPES = {
  0: '女性',
  1: '男性'
}
