import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import {computed} from 'mobx'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';
import {WithStyles} from '@material-ui/core/styles'
import queryString from 'query-string'

import {AppState, TopicStore} from '../../store/store'
import ListItemContainer from './list-item-container/index'
import TopicTabs from './topic-tabs'
import Loading from './Loading'


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

@inject(store => ({
    appState: store.appState,
    topicStore: store.topicStore
  }
))
@observer
@WithStyles(style)
export default class TopicList extends Component {
  componentDidMount() {
    console.log(this.getTab)
    this.props.topicStore.fetchTopicListData(this.getTab)
  }

  get getTab() {
    return queryString.parse(this.props.location.search).tab
  }

  render() {
    const {topicStore, classes} = this.props
    const {topicStoreList} = topicStore

    return (
      <Fragment>
        <TopicTabs {...this.props} key={this.getTab}/>
        <List className={classes.contentArea}>
          {topicStoreList.map((topicData, i) => {
            return (
              <Fragment>
                < ListItemContainer
                  // key={topicData.id}
                  onListItemClick={() => {
                    console.log('listItemContainer  onListItemClick')
                  }}
                  topicData={topicData}
                />
              </Fragment>
            )
          })
          }
        </List>
        {topicStore.syncing ? <Loading/> : null}
      </Fragment>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,  // eslint-disable-line
  appState: PropTypes.instanceOf(AppState), // eslint-disable-line
  topicStore: PropTypes.instanceOf(TopicStore), // eslint-disable-line
  location: PropTypes.object.isRequired,  // eslint-disable-line
  match: PropTypes.object.isRequired  // eslint-disable-line
}
