import Axios from 'axios'
import { isUserDetailsValid } from '../utils/validationUtils'

import parseLinkHeader from 'parse-link-header'
import requestFn from './requestFn'

export const fetchTableData2 = (url, pageNumber, dispatchStorePage) => {
  Axios.get(url).then((response) => {
    const { data, headers: { link } } = response
    dispatchStorePage(pageNumber, data, parseLinkHeader(link))
  })
}

export const fetchTableData = (url, successCb, errorCb) => {
  const parser =  (_data) => {
    const { data, headers: { link } } = _data
    return { data, link }
  }
  requestFn({ url, parser }, successCb, errorCb)
}

export const fetchUserData = (userName, dispatchSetUserDetails) => {
  Axios.get(`https://api.github.com/users/${userName}`).then(({ data }) => {
    dispatchSetUserDetails(isUserDetailsValid(data) ? data : NO_USER)
  }).catch(() => { dispatchSetUserDetails(NO_USER) })
}

const NO_USER = {
  avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  login: 'john_doe',
  name: 'John Doe'
}
