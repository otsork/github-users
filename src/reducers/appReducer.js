
/*
  appReducer.js was initially named tableReducer.js,
  since the app is small I figured that its not a crime to have everything in a single reducer file
*/
import { STORE_PAGE, SET_CURRENT_PAGE, OPEN_USER_DETAILS } from '../actions/appActions'

const initialState = {
  pages: {},
  currentPageNumber: 1,
  paginationLinks: {}
}

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case STORE_PAGE: {
      const { payload: { pageNumber, data, paginationLinks } } = action

      return {
        ...state,
        pages: {
          ...state.pages,
          [pageNumber]: data
        },
        currentPageNumber: pageNumber,
        paginationLinks: paginationLinks
      }
    }
  
    case SET_CURRENT_PAGE: {
      const { payload: { pageNumber } } = action

      return {
        ...state,
        currentPageNumber: pageNumber
      }
    }

    case OPEN_USER_DETAILS: {
      // const { payload } = action

      return {
        ...state,
      }
    }

    default:
      return state
  }
}

export default appReducer