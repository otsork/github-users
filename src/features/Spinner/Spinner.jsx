import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles((theme) => {
  return {
    spinner: {
      display: 'flex',
      position: 'fixed',
    },
  }
})

const Spinner = (props) => {
  const classes = useStyles()
  const { size = 20 } = props

  const offset = `calc(50% - ${size / 2}px)`
  const style = {
    left: offset,
    top: offset
  }

  return (
    <div className={classes.spinner} style={style}>
      <CircularProgress size={size} />
    </div>
  )
}

export default Spinner
