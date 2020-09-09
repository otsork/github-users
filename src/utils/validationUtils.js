export const isTableDataValid = (users) => Boolean(
  Array.isArray(users) &&
  users.length &&
  typeof users[0].login === 'string' &&
  typeof users[0].id === 'number'
)

export const isUserDetailsValid = (userDetails) => Boolean(
  userDetails.name &&
  userDetails.login &&
  userDetails.avatar_url
)
