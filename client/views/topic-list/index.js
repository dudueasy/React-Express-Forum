import React from 'react'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'

import AppStateClass from '../../store/app-state'


@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {

  }

  @action changeName = (e) => {
    this.props.appState.name = e.target.value
  }

  asyncBoostrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 3000)
    })
  }

  render() {
    const {appState} = this.props

    return (
      <div>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="this is description"/>
        </Helmet>
        <input type="text" onChange={this.changeName}/>
        This is topic list component
        <p>
          {appState.msg}
        </p>
      </div>
    )
  }
}


TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppStateClass),
}


// TopicList.defaultProps = {
//   appState: new AppState(),
// }
