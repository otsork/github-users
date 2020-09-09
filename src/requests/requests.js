import Axios from 'axios'
import parseLinkHeader from 'parse-link-header'
import { isUserDetailsValid } from '../utils/validationUtils'

export const fetchTableData = (url, pageNumber, dispatchStorePage) => {
  Axios.get(url).then((response) => {
    const { data, headers: { link } } = response
    dispatchStorePage(pageNumber, data, parseLinkHeader(link))
  })
}

export const fetchUserData = (userName, dispatchSetUserDetails) => {
  Axios.get(`https://api.github.com/users/${userName}`).then((response) => {
    const { data } = response
    const userData = isUserDetailsValid(data) ? data : NO_USER
    dispatchSetUserDetails(userData)
  }).catch(() => { dispatchSetUserDetails(NO_USER) })
}

const NO_USER = {
  avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  login: 'john_doe',
  name: 'John Doe'
}
