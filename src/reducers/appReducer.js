
/*
  I intended to have multiple reducers, since the app is small
  I figured that its not a crime to have everything in a single file
*/
import { STORE_PAGE, SET_CURRENT_PAGE, SET_USER_DETAILS } from '../actions/appActions'

const initialState = {
  pages: {},
  userDetails: {},
  currentPageNumber: 1,
  paginationLinks: {}
}

const appReducer = (state = initialState, action) => {
  const { payload } = action

  switch(action.type) {
    case STORE_PAGE: {
      const { pageNumber, data, paginationLinks } = payload
      console.log(payload)

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
      const { pageNumber } = payload

      return {
        ...state,
        currentPageNumber: pageNumber
      }
    }

    case SET_USER_DETAILS: {
      const { userDetails } = payload

      return {
        ...state,
        userDetails
      }
    }

    default:
      return state
  }
}

export default appReducer