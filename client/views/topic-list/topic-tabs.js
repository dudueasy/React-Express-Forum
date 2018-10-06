import React, {Fragment} from 'react';
import {Tabs, Tab} from '@material-ui/core'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'

import AppStateClass from '../../store/app-state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  state = {
    selectedTab: 0
  }

  componentDidMount() {
  }


  handleTabChange = (event, value) => {
    this.setState({
      selectedTab: value
    })
  }

  asyncBoostrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 3000)
    })
  }

  render() {
    const {appState} = this.props
    const {selectedTab} = this.state

    return (
      <Fragment>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="this is description"/>
        </Helmet>

        <Tabs
          scrollable
          scrollButtons="on"
          value={selectedTab}
          onChange={this.handleTabChange}
        >
          <Tab label="全部"/>
          <Tab label="精华"/>
          <Tab label="分享"/>
          <Tab label="问答"/>
          <Tab label="招聘"/>
          <Tab label="测试"/>
        </Tabs>
      </Fragment>
    )
  }
}


TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppStateClass),
}
