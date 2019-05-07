const isDev = () => {
  return process.env.NODE_ENV === 'development'
}

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
