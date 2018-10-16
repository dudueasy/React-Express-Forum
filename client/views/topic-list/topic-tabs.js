import React, {Fragment} from 'react';
import {Tabs, Tab} from '@material-ui/core'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
// import queryString from 'query-string'

import getTopicTab from '../../util/getTopicTab'


import {AppState, TopicStore} from '../../store/store'
import AppStateClass from '../../store/app-state'
import {tabMapping} from '../../util/variable-difine'


@inject(store => ({
    appState: store.appState,
    topicStore: store.topicStore
  }
))
@observer
export default class TopicList extends React.Component {

  get getTab() {
    return getTopicTab(this.props.location)
  }

  handleTabChange = (event, tabValue) => {
    console.log('currentTabValue: ', tabValue)
    console.log('this.props.history:', this.props)
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `?tab=${tabValue}`
    })

    this.props.topicStore.updateTopicTab(tabValue)
  }


  asyncBoostrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 0)
    })
  }

  render() {
    const {appState} = this.props
    const {history} = this.props

    return (
      <Fragment>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="this is description"/>
        </Helmet>

        <Tabs
          scrollable
          scrollButtons="auto"
          value={this.getTab}
          onChange={this.handleTabChange}
        >
          {Object.keys(tabMapping).map(
            key => (<Tab label={tabMapping[key]} value={key} key={key}/>
            )
          )}

        </Tabs>
      </Fragment>
    )
  }
}


TopicList
  .propTypes = {
  topicStore: PropTypes.object.isRequired, // eslint-disable-line
  appState: PropTypes.instanceOf(AppStateClass),
  history: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
  match: PropTypes.object.isRequired // eslint-disable-line
}
