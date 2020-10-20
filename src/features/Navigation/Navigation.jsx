import React from 'react'
import parseLinkHeader from 'parse-link-header'
import { makeStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'

// import actions from '../../actions'
import { fetchTableData } from '../../requests/requests'


const useStyles = makeStyles({
  navigationWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
})

const Navigation = (props) => {
  const {
    goToStoredPage,
    currentPageNumber,
    paginationLinks,
    pageIsStored,
    dispatchStorePage
  } = props

  // hooks
  const classes = useStyles()

  console.log(paginationLinks)
  const goToNextPage = (pageNumber) => {
    if (pageIsStored(pageNumber)) goToStoredPage(pageNumber)
    else {
      fetchTableData(paginationLinks.next.url, (response) => {  
        const { data, headers: { link } } = response
        dispatchStorePage(pageNumber, data, parseLinkHeader(link))
      })
    }
  }

  const goToLastPage = () => {
    fetchTableData(paginationLinks.last.url, undefined, dispatchStorePage)
  }

  console.log(paginationLinks)
  const { next = '', last = '' } = paginationLinks || {}
  const page = currentPageNumber

    return (
      <div id='navigationWrapper' className={classes.navigationWrapper}>
        <Button disabled={page === 1} onClick={() => goToStoredPage(1)}>First</Button>
        <Button disabled={page === 1} onClick={() => goToStoredPage(page - 1)}>Prev</Button>
        <Button className={classes.pageIndicator}>page: {page}</Button>
        <Button disabled={!next} onClick={() => goToNextPage(page + 1, next.rel)}>Next</Button>
        <Button disabled={!last} onClick={() => goToLastPage()}>Last</Button>        
      </div>
    )
}

export default Navigation