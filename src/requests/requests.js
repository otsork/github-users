import requestFn from './requestFn'

export const fetchTableData = (url, successCb, errorCb) => {
  requestFn({ url }, successCb, errorCb)
}

export const fetchUserData = (userName, successCb, errorCb) => {
  requestFn({ url: `https://api.github.com/users/${userName}` }, successCb, errorCb)
}
