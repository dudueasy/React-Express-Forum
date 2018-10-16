import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import {Helmet} from 'react-helmet'
import {inject, observer} from 'mobx-react'
import {withStyles} from '@material-ui/core/styles'
import {Paper, CircularProgress} from '@material-ui/core'

import Loading from '../layout/Loading'

import Container from '../layout/container'

// import {topicDetailStyle} from './styles'
// import Reply from './reply'

const style = theme => ({
  '@global': {
    html: {
      height: '100%'
    }
  },
  content: {
    minHeight: '100%'
  }
})

@withStyles(style)
@inject(stores => ({topicStore: stores.topicStore}))
@observer
export default class TopicDetail extends React.Component {
  constructor(props) {
    super(props)
    this.props.topicStore.updateTopicTab('')
    this.props.topicStore.fetchTopicDetail(this.getTopicId)
  }

  componentDidMount() {
    // do something here
  }

  get getTopicId() {
    return this.props.match.params.id
  }

  render() {

    const topicId = this.getTopicId
    console.log('topicId:', topicId)


    const {
      classes,
      topicStore: {
        syncing, topicDetail, topicDetail: {content}
      }
    } = this.props
    console.log('syncing:', syncing)


    return (
      <Fragment>
        {syncing ? <Loading/> : null}
        <Helmet>
          <title>This is topic detail page</title>
          <meta name="description" content="this is description"/>
        </Helmet>

        <div className={classes.content}>
          {content
            ? <div dangerouslySetInnerHTML={{__html: marked(content)}}/>
            : null
          }
        </div>
      </Fragment>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired
}


TopicDetail.propTypes = {
  classes: PropTypes.object.isRequired, //eslint-disable-line
  location: PropTypes.object.isRequired, //eslint-disable-line
  match: PropTypes.object.isRequired,//eslint-disable-line
}
