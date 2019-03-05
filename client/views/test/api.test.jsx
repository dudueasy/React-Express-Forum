import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class TestApi extends React.Component {

  getTopic() {
    axios.get('/api/topics')
      .then(res => console.log('request /api/topics successfully'))
      .catch(err => console.log)
  }

  login() {
    axios.post('/api/user/login', {
      accesstoken: 'e8cad389-e0a5-4769-9eee-5a5c3be7cfd8'
      // accesstoken: 'e8cad389-e0a5-4769-9eee-5a5c3be7c'
    })
      .then(res => console.log('request /api/user/login successfully'))
      .catch(err => console.log)
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true'
    )
      .then(res => {
      })
      .catch(err => console.log)
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.getTopic}> topics</button>
        <button type="button" onClick={this.login}> login</button>
        <button type="button" onClick={this.markAll}> markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
