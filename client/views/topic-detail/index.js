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
      height: '100%',
      fontFamily: "Roboto"
    },
    p: {
      fontSize: '15px',
      lineHeight: '1.7em',
      overflow: 'auto'
    },
    a: {
      textDecoration: 'none',
      color: '#08c'
    },
    img: {
      maxWidth: '100%'
    },
    pre: {
      fontSize: 14,
      borderRadius: 0,
      padding: '10px 15px',
      border: 'none',
      margin: '20px -10px',
      borderWidth: '1px 0',
      background: '#f7f7f7',
      tabSize: 4,
    },
    code: {
      color: 'inherit',
      whiteSpace: 'pre-wrap',
      backgroundColor: 'transparent',
      lineHeight: '22px'
    }
  },
  container: {
    background: '#fafafa'
  },
  upperArea: {
    background: 'white',
    paddingTop: 20,
    paddingBottom: 20
  },
  lowerArea: {
    background: '#fafafa',
    marginTop: 20
  },
  Grid: {
    flexGrow: 1,
    alignItem: 'center',
    justifyContent:
      'center'
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
        {syncing
          ? <Loading/>
          : (
            <Fragment>
              <Helmet>
                <title>Node & Us | {topicDetail.title}</title>
                <meta name="description" content="topic detail page"/>
              </Helmet>

              <div className={classes.container}>
                <div className={classes.upperArea}>
                  <Grid container xs={12} className={classes.Grid}>
                    <Grid item xs={11} sm={8} md={6}>
                      <Header/>
                      <Content/>
                    </Grid>
                  </Grid>
                </div>

                <div className={classes.lowerArea} id='topic-detail-reply'>
                  <Grid container xs={12} className={classes.Grid}>
                    <Grid item xs={11} sm={8} md={6}>
                      <Reply/>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Fragment>
          )
        }

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
