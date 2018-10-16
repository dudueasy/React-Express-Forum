import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import {Helmet} from 'react-helmet'
import {inject, observer} from 'mobx-react'
import {withStyles} from '@material-ui/core/styles'
import {Paper, CircularProgress} from '@material-ui/core'

import Container from '../layout/container'

// import {topicDetailStyle} from './styles'
// import Reply from './reply'


@inject(stores => ({topicStore: stores.topicStore}))
export default class TopicDetail extends React.Component {
  // constructor() {
  // }

  componentDidMount() {
    // do something here
  }

  render() {
    const topic = this.props.topicStore.topicDataList[0]
    return (<div>This is topic detail component</div>)
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired
}
