import React from "react"
import {withStyles} from "@material-ui/core/styles"
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import marked from 'marked'

const style = theme => ({})

@inject(stores => ({
  topicStore: stores.topicStore
}))
@withStyles(style)
@observer
export default class Content extends React.Component {
  render() {
    const {classes, topicStore} = this.props
    const {topicDetail} = topicStore
    console.log('topicDetail: ', topicDetail)

    return (
      <React.Fragment>
        <div
          className={classes.contentContainer}
          dangerouslySetInnerHTML={{__html: marked(topicDetail.content)}}
        />
      </React.Fragment>
    )
  }
}

Content.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
}
