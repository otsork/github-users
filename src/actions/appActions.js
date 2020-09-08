/*
  I intended to have multiple action files, but since the app is small
  I figured that its not a crime to have everything in a single file
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

export const SET_USER_DETAILS = 'SET_USER_DETAILS'
const setUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: { userDetails }
})

export default {
  storePage,
  setCurrentPageNumber,
  setUserDetails
}