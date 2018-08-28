import React from 'react'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'
import {AppState} from '../../store/app.state'

@inject('appState') @observer
export default class TopicList extends React.Component {
  componentDidMount() {
    window.appState = this.props.appState
    window.AppState = AppState
  }

  @action changeName = (e) => {
    this.props.appState.name = e.target.value
  }


  render() {
    const {appState} = this.props

    return (
      <div>
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
  appState: PropTypes.instanceOf(AppState).isRequired,
};
