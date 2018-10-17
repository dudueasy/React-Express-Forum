import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import {computed} from 'mobx'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles'
import {Helmet} from 'react-helmet'

import {AppState, TopicStore} from '../../store/store'
import ListItemContainer from './list-item-container/index'
import TopicTabs from './topic-tabs'
import Loading from '../layout/Loading'
import getTopicTab from '../../util/getTopicTab'


const style = theme => ({
  '@global': {
    'html,body,#root': {
      height: '100%'
    }
  },
  contentArea: {
    minHeight: 'calc( 100% - 56px )'
  }
})

@withStyles(style)
@inject(store => ({
    appState: store.appState,
    topicStore: store.topicStore
  }
))
@observer
export default class TopicList extends Component {
  constructor(props) {
    super(props)
    console.log('this.getTab:', this.getTab)
    this.props.topicStore.updateTopicDetail('')
    this.props.topicStore.updateTopicTab(this.getTab)
  }


  componentDidMount() {
    console.log('component Did Mount')
    console.log(this.getTab)
  }

  get getTab() {
    return getTopicTab(this.props.match)
  }

  handleListItemClick = (topicData) => {
    this.props.history.push(`/detail/${topicData.id}`)
  }


  render() {
    const {topicStore, classes} = this.props
    const {topicStoreList} = topicStore
    console.log('topicStoreList:', topicStoreList)

    return (
      <Fragment>
        <Helmet>
          <title>Node & Us | {this.getTab}</title>
          <meta name="description" content="topic list page"/>
        </Helmet>
        <TopicTabs {...this.props} key={this.getTab}/>
        <List className={classes.contentArea}>
          {topicStoreList.map((topicData, i) => {
            return (
              < ListItemContainer
                // key={topicData.id}
                topicData={topicData}
                onListItemClick={() => {
                  this.handleListItemClick(topicData)
                }}
              />
            )
          })
          }
        </List>
        {topicStore.syncing ? <Loading/> : null}
      </Fragment>
    )
  }
}

TopicList.wrappedComponent
  .propTypes = {
  classes: PropTypes.object.isRequired,  // eslint-disable-line
  appState: PropTypes.instanceOf(AppState), // eslint-disable-line
  topicStore: PropTypes.instanceOf(TopicStore), // eslint-disable-line
  location: PropTypes.object.isRequired,  // eslint-disable-line
  match: PropTypes.object.isRequired,  // eslint-disable-line
  history: PropTypes.object.isRequired  // eslint-disable-line
}
