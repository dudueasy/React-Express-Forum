import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'


import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'


export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} key="first-route" exact/>,
  <Route path="/list" component={TopicList} key="second-route" />,
  <Route path="/detail" component={TopicDetail} key="third-route" />,
]
