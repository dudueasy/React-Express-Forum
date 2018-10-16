import queryString from 'query-string'

export default (match) => {
  console.log('matchobj:', match)
  return match.params.tab || 'all'
}
