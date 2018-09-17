import React from 'react'
import {Link} from 'react-router-dom'
import Routes from '../config/router'


export default class App extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return [
      <div key="banner">
        <Link to="/">首页</Link>
        <br/>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes key="routes"/>,
    ]
  }
}
