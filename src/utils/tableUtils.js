export const validateTableData = (users) => Boolean(
  Array.isArray(users) &&
  users.length &&
  typeof users[0].login === 'string' &&
  typeof users[0].id === 'number'
)

export const parseHeaderLink = (headerLink) => {
  if (typeof headerLink !== 'string') {
    console.error('parseHeaderLink: argument must be of type "string", returning an empty string')
    return ''
  }
  const headerLinksArray = headerLink.split(', ')
  const parsedHeaderLinks = headerLinksArray.reduce((result, link) => {
    const linkItems = link.split('; ')
    const url = linkItems[0].slice(1, -1)
    const rel = linkItems[1].replace('rel=', '').replaceAll('"', '')
    return { ...result, [rel]: { rel, url } }
  }, {})
  return parsedHeaderLinks
}
