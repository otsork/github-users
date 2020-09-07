import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import parseLinkHeader from 'parse-link-header'
import Axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core'

import { validateTableData } from '../../utils/tableUtils'
import actions from '../../actions'

const AVATAR_SIZE = 50
const ROW_HEIGHT = AVATAR_SIZE + 10
const useStyles = makeStyles({
  table: {
    minWidth: '100%',
    overflow: 'hidden'
  },
  tableRow: {
    display: 'flex',
    height: ROW_HEIGHT,
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .04)'
    }
  },
  tableCell: {
    display: 'flex',
    alignItems: 'center',
    
  },
  loginCell: {
    display: 'flex',
    minWidth: '100%',
    maxWidth: '100%',
    flexDirection: 'row',

  },
  avatarCell: {
    display: 'flex',
    minWidth: '100px',
    justifyContent: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: '50%',
    margin: '3px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      transition: 'all 0.2s',
      backgroundColor: 'rgba(0, 0, 0, .2)', // colors.avatarHighlight,
      padding: '3px',      
    }
  },
  navigationWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  pageIndicator: {
    pointerEvents: 'none',
    whiteSpace: 'nowrap'
  }
})

const Table = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // actions
  const dispatchStorePage = (pageNumber, data, headerLinks) => dispatch(actions.app.storePage(pageNumber, data, headerLinks))
  const dispatchSetCurrentPageNumber = (pageNumber) => dispatch(actions.app.setCurrentPageNumber(pageNumber))

  // selectors
  const { currentPageNumber, pages, paginationLinks } = useSelector(state => state.app)
  const currentPageData = pages[currentPageNumber]
  const numberOfStoredPages = Object.keys(pages).length
  

  const fetchUsers = (url, pageNumber) => {
    Axios.get(url)
      .then((response) => {
        const { data, headers: { link } } = response
        dispatchStorePage(pageNumber, data, parseLinkHeader(link))
      })
      .catch((error) => console.error('fetchUsers: error', error))
  }

  useEffect(() => {
    if (pageIsStored(1)) goToStoredPage(currentPageNumber || 1)
    else fetchUsers('https://api.github.com/users?per_page=5', 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getListHeader = () => (
    <TableHead key='table-header'>
      <TableRow className={classes.tableRow}>
        <TableCell className={classes.avatarCell}>Avatar</TableCell>
        <TableCell className={classes.loginCell}>Login</TableCell>
      </TableRow>
    </TableHead>
  )

  const getListRows = () => {
    return (
      <TableBody key='table-body'>
        {
          validateTableData(currentPageData) && currentPageData.map((row) => (
            <TableRow key={ row.login } className={classes.tableRow}>
              <TableCell className={`${classes.tableCell} ${classes.avatarCell}`} component="th" scope="row">
                <img className={classes.avatar} src={row.avatar_url} alt='avatar' />
              </TableCell>
              <TableCell className={`${classes.tableCell} ${classes.loginCell}`}>
                { row.login }
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    )
  }

  const pageIsStored = (pageNumber) => Boolean(numberOfStoredPages >= pageNumber)

  const goToStoredPage = (pageNumber) => { dispatchSetCurrentPageNumber(pageNumber) }

  const goToNextPage = (pageNumber) => {
    if (pageIsStored(pageNumber)) goToStoredPage(pageNumber)
    else fetchUsers(paginationLinks.next.url, pageNumber)
  }

  const goToLastPage = () => {
    // github users api doesn't seem to provide headerLink for the last page
    fetchUsers(paginationLinks.last.url)
  }

  const getNavigation = () => {
    const { next, last } = paginationLinks
    const page = currentPageNumber

    return (
      <div className={classes.navigationWrapper}>
        <Button disabled={page === 1} onClick={() => goToStoredPage(1)}>First</Button>
        <Button disabled={page === 1} onClick={() => goToStoredPage(page - 1)}>Prev</Button>
        <Button className={classes.pageIndicator}>page: {page}</Button>
        <Button disabled={!next} onClick={() => goToNextPage(page + 1, next.rel)}>Next</Button>
        <Button disabled={!last} onClick={() => goToLastPage()}>Last</Button>        
      </div>
    )
  }

  return (
    <TableContainer component={Paper}>
      <MUITable className={classes.table} aria-label="github users table">
        { getListHeader() }
        { getListRows() }
      </MUITable>
      { getNavigation() }
    </TableContainer>
  )
}

export default Table