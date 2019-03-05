import axios from 'axios'
import qs from 'query-string'

const baseUrl = process.env.API_BASE || ''


const parseUrl = (url, paramsObj) => {
  const queryString = `?${qs.stringify(paramsObj)}` 
  const parsedUrl = new URL(`api${url}${queryString}`, baseUrl);

  console.log('parsedUrl:', parsedUrl)
  return parsedUrl
}


export function get(url, paramsObj) {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, paramsObj))
      .then((response) => {
        const {data} = response
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch(
        (err) => {
          reject(err)
        }
      )
  })
}


export function post(url, paramsObj, postData) {
  return new Promise((resolve, reject) => {
    axios.post(parseUrl(url, paramsObj), postData)
      .then((response) => {
        const {data} = response
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch(
        (err) => {
          reject(err)
        }
      )
  })
}
