import queryString from 'query-string'

export default (location) => {
  return queryString.parse(location.search).tab
}
