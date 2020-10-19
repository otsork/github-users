import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card
} from '@material-ui/core'
import Spinner from '../Spinner/Spinner'
import Navigation from '../Navigation/Navigation'

import actions from '../../actions'
import { isTableDataValid } from '../../utils/validationUtils'
import { fetchTableData } from '../../requests/requests'


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
  },
  tableContentRow: {
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
      backgroundColor: 'rgba(0, 0, 0, .2)',
      padding: '3px',      
    }
  },
  pageIndicator: {
    pointerEvents: 'none',
    whiteSpace: 'nowrap'
  },
})

const Table = () => {
  // hooks
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  // actions
  const dispatchStorePage = (pageNumber, data, headerLinks) => dispatch(actions.app.storePage(pageNumber, data, headerLinks))
  const dispatchSetCurrentPageNumber = (pageNumber) => dispatch(actions.app.setCurrentPageNumber(pageNumber))
  // selectors
  const { currentPageNumber = 1, pages, paginationLinks } = useSelector(state => state.app)
  const currentPageData = pages[currentPageNumber]
  const numberOfStoredPages = Object.keys(pages).length

  useEffect(() => {
    if (pageIsStored(currentPageNumber)) goToStoredPage(currentPageNumber)
    else fetchTableData('https://api.github.com/users?per_page=5', 1, dispatchStorePage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getListHeader = () => (
    <TableHead key='table-header'>
      <TableRow className={classes.tableRow} >
        <TableCell className={classes.avatarCell}>Avatar</TableCell>
        <TableCell className={classes.loginCell}>Login</TableCell>
      </TableRow>
    </TableHead>
  )

  const getListRows = () => {
    const shouldTableRowsRender = isTableDataValid(currentPageData) && pageIsStored(currentPageNumber)
    return (
      <TableBody key='table-body'>
        {
          shouldTableRowsRender &&
          currentPageData.map((row) => (
            <TableRow key={ row.login } className={`${classes.tableRow} ${classes.tableContentRow}`}>
              <TableCell className={`${classes.tableCell} ${classes.avatarCell}`} component="th" scope="row">
                <img className={classes.avatar} src={row.avatar_url} alt='avatar' onClick={() => openUserDetails(row.login)} />
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

  const openUserDetails = (login) => {
    if (typeof login !== 'string') {
      console.error(`openUserDetails: Error, invalid argument data type {${typeof login}}`)
    } else history.push(`/${login}`)
  }

  const pageIsStored = (pageNumber) => Boolean(numberOfStoredPages >= pageNumber)

  const goToStoredPage = (pageNumber) => { dispatchSetCurrentPageNumber(pageNumber) }

  return (
    <TableContainer component={Paper}>
      <MUITable className={classes.table} aria-label="github users table">
        { getListHeader() }
        { getListRows() }
      </MUITable>
      <Navigation
        paginationLinks={paginationLinks}
        currentPageNumber={currentPageNumber}
        dispatchStorePage={dispatchStorePage}
        goToStoredPage={goToStoredPage}
        pageIsStored={pageIsStored} />
      { !isTableDataValid(currentPageData) && <Card className={classes.tableRow}><Spinner size={50} /></Card> }
    </TableContainer>
  )
}

export default Table