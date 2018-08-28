import React from 'react'
import {Link} from 'react-router-dom'
import Routes from '../config/router'


export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <div>
        <Link to="/" key="first-link">首页</Link>
        <br/>
        <Link to="/detail" key="second-link">详情页</Link>
      </div>,
      <Routes/>,
    ]
  }
}
