/*
  appActions.js was initially named tableActions.js,
  since the app is small I figured that its not a crime to have everything in a single actions file
*/
export const STORE_PAGE = 'STORE_PAGE'
const storePage = (pageNumber, data, paginationLinks) => ({
  type: STORE_PAGE,
  payload: { pageNumber, data, paginationLinks }
})

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const setCurrentPageNumber = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  payload: { pageNumber }
})

export const OPEN_USER_DETAILS = 'OPEN_USER_DETAILS'
const openUserDetails = (userData) => ({
  type: OPEN_USER_DETAILS,
  payload: { userData }
})

export default {
  storePage,
  setCurrentPageNumber,
  openUserDetails
}