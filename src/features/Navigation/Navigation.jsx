import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'

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

  const goToNextPage = (pageNumber) => {
    if (pageIsStored(pageNumber)) goToStoredPage(pageNumber)
    else {
      fetchTableData(paginationLinks.next.url, ({ data, links }) => {
        dispatchStorePage(pageNumber, data, links)
      })
    }
  }

  const goToLastPage = () => {
    fetchTableData(paginationLinks.last.url, ({ data, links }) => {
      dispatchStorePage(undefined, data, links)
    })
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