import queryString from 'query-string'

export default (match) => {
  return match.params.tab || 'all'
}
