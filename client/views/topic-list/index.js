import React, {Fragment} from 'react'

import ListItemContainer from './list-item-container/index'
import TopicTabs from './topic-tabs'

//onListItemClick, topicData

const topicData = {
  title: 'this is title of article',
  img: 'xx',
  tab: 'all',
  username: 'apolo',
  reply_count: 1,
  visit_count: '100',
  create_at: '2018/10/6'
}

export default props => (
  <Fragment>
    <TopicTabs/>
    <ListItemContainer
      onListItemClick={() => {
        console.log('listItemContainer  onListItemClick')
      }}

      topicData={topicData}
    />

  </Fragment>
)
