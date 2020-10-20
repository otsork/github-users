import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Icon,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core'
import Spinner from '../Spinner/Spinner'
import actions from '../../actions'

import { isUserDetailsValid } from '../../utils/validationUtils'
import { fetchUserData } from '../../requests/requests'


const useStyles = makeStyles({
  card: {
    position: 'relative',
    minWidth: '345px',
    padding: '15px'
  },
  avatarWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',  
  },
  avatar: {
    height: '200px',
    width: '200px',
    alignSelf: 'center',
    backgroundSize: 'contain',
    borderRadius: '50%'
  },
  login: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  },
  userProperty: {
    whiteSpace: 'nowrap'
  },
  backButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '50px',
    borderRadius: '50%',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, .00)',
    transition: 'all 0.4s',
    '&:hover': {
      transition: 'all 0.4s',
      backgroundColor: 'rgba(0, 0, 0, .08)',
    }
  },
})

const UserDetails = () => {
  // hooks
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  // actions
  const dispatchSetUserDetails = (userDetails) => dispatch(actions.app.setUserDetails(userDetails))

  // selectors
  const user = useSelector(state => state.app.userDetails)

  useEffect(() => {
    const NO_USER = {
      avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      login: 'john_doe',
      name: 'John Doe'
    }

    if (!isUserDetailsValid(user) || !pathAndLoginMatch(browserPath, user.login)) {
      fetchUserData(browserPath, ({ data }) => {
        dispatchSetUserDetails(isUserDetailsValid(data) ? data : NO_USER)
      }, () => {
        dispatchSetUserDetails(NO_USER)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pathAndLoginMatch = (path, login) => (path === login)
  const browserPath = window.location.pathname.substring(1)
  const isLoading = !isUserDetailsValid(user) || (!pathAndLoginMatch(browserPath, user.login) && user.login !== 'john_doe')
  return (
    isLoading ? <Spinner size={80} /> :
    <Card className={classes.card}>
      <Icon className={classes.backButton} onClick={() => { history.push('') }}>
        close
      </Icon>
      <div className={classes.avatarWrapper}>
        <CardMedia className={classes.avatar} image={user.avatar_url} title={user.name} />
      </div>
      <CardContent>
        <div className={classes.login}>
          <Typography gutterBottom variant="h5" component="h2">
            {user.login}
          </Typography>
        </div>
        {
          Object.keys(user).map(property => (
            <Typography
              className={classes.userProperty}
              variant="body2"
              color="textSecondary"
              component="p"
              key={property}>
              {`${property.toUpperCase()}: ${user[property]}`}
            </Typography>
          ))
        }
      </CardContent>
    </Card>
  )
}

export default UserDetails