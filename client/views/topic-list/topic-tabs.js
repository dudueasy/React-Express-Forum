import React, {Fragment} from 'react';
import {Tabs, Tab} from '@material-ui/core'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import {Redirect} from 'react-router-dom'


import {TopicStore} from '../../store/store'
import {tabMapping} from '../../util/variable-difine'

import getTopicTab from '../../util/getTopicTab'


@inject(store => ({
    topicStore: store.topicStore
  }
))
@observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.props.topicStore.updateTopicTab(this.getTab)
  }


  get getTab() {
    return getTopicTab(this.props.match)
  }

  handleTabChange = (event, tabValue) => {
    console.log('currentTabValue: ', tabValue)
    console.log('this.props.history:', this.props)
    this.props.history.push({
      pathname: `/list/${tabValue}`
    })
  }



  render() {
    const {history} = this.props

    return (
      <Fragment>
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
  history: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
  match: PropTypes.object.isRequired // eslint-disable-line
}
