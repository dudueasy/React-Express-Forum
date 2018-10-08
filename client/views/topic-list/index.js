import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import {toJS} from 'mobx'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List';

import {AppState, TopicStore} from '../../store/store'
import ListItemContainer from './list-item-container/index'
import TopicTabs from './topic-tabs'

// //onListItemClick, topicData
// const topicData = {
//   title: 'title of current article',
//   img: 'xx',
//   tab: 'all',
//   username: 'apolo',
//   reply_count: 1,
//   visit_count: '100',
//   create_at: '2018/10/6'
// }


@inject(store => ({
    appState: store.appState,
    topicStore: store.topicStore
  }
)) @observer
export default class TopicList extends Component {
  componentDidMount() {
    // fetch initial data
    this.props.topicStore.fetchTopicListData()
  }

  render() {
    const {topicStoreList} = this.props.topicStore

    return (
      <Fragment>
        <TopicTabs/>
        <List>

          {topicStoreList.map((topicData, i) => {
            console.log(i, topicData)
            return (
              < ListItemContainer
                onListItemClick={() => {
                  console.log('listItemContainer  onListItemClick')
                }}
                topicData={topicData}
              />
            )
          })
          }
        </List>
      </Fragment>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState), // eslint-disable-line
  topicStore: PropTypes.instanceOf(TopicStore), // eslint-disable-line
}
