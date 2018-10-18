import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import {Helmet} from 'react-helmet'
import {inject, observer} from 'mobx-react'
import {withStyles} from '@material-ui/core/styles'
import {Grid, Divider} from '@material-ui/core'

import Loading from '../layout/Loading'
import Header from './Header'
import Content from './Content'
import Reply from './Reply'


const style = theme => ({
  '@global': {
    html: {
      height: '100%'
    }
  },
  container: {
    background: '#fafafa'
  },
  upperArea: {
    background: 'white', paddingTop: 20, paddingBottom: 20
  },
  lowerArea: {
    background: '#fafafa', marginTop: 20
  },
  Grid: {
    flexGrow: 1,
    alignItem: 'center',
    justifyContent: 'center'
  },
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


  get getTopicId() {
    return this.props.match.params.id
  }

  render() {
    const topicId = this.getTopicId
    console.log('topicId:', topicId)


    const {
      classes,
      topicStore: {
        syncing, topicDetail, topicDetail: {content}, topicReply
      }
    } = this.props
    console.log('syncing:', syncing)


    return (
      <Fragment>
        {syncing ? <Loading/> : null}
        <Helmet>
          <title>Node & Us | {topicDetail.title}</title>
          <meta name="description" content="topic detail page"/>
        </Helmet>

        <div className={classes.container}>
          <div className={classes.upperArea}>
            <Grid container xs={12} className={classes.Grid}>
              <Grid item xs={11} sm={8} md={6}>
                <Header topicDetail={topicDetail}/>
                <Content topicDetail={topicDetail}/>
              </Grid>
            </Grid>
          </div>

          <div className={classes.lowerArea}>
            <Grid container xs={12} className={classes.Grid}>
              <Grid item xs={11} sm={8} md={6}>
                <Reply topicReply={topicReply}/>
              </Grid>
            </Grid>
          </div>
        </div>

      </Fragment>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired, //eslint-disable-line
  location: PropTypes.object.isRequired, //eslint-disable-line
  match: PropTypes.object.isRequired,//eslint-disable-line
}
