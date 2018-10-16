import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'


import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/api.test'


export default () => [
  <Route path="/" render={() => <Redirect to="/list"/>} key="first-route" exact/>,
  <Route path="/list/:tab?" component={TopicList} key="second-route"/>,
  <Route path="/detail/:id" component={TopicDetail} key="third-route"/>,
  <Route path="/test" component={TestApi} key="test"/>,
]
