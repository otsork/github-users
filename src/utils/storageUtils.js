export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.warning('loadState: Loading state failed', err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    console.log('SAVING STATE')
    const serializedState = JSON.stringify(state)
    console.log('saved state', state)
    sessionStorage.setItem('state', serializedState)
    console.log(loadState())
  } catch (err) {
    console.warning('saveState: Saving state failed', err)
  }
}
