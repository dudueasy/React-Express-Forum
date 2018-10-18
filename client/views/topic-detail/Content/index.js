import React from "react"
import {withStyles} from "@material-ui/core/styles"
import PropTypes from 'prop-types'

const style = theme => ({
  '@global': {
    p: {
      fontFamily: "Roboto"
    }
  }
})

@withStyles(style)
export default class Content extends React.Component {
  render() {
    const {topicDetail} = this.props
    console.log('topicDetail: ', topicDetail)

    return (
      <React.Fragment>
        <p>
          ListItemAvatar The API documentation of the ListItemAvatar React
          component. Learn more about the properties and the CSS customization
          points.
        </p>
        <p>
          ListItemAvatar The API documentation of the ListItemAvatar React
          component. Learn more about the properties and the CSS customization
          points.
        </p>
        <p>
          ListItemAvatar The API documentation of the ListItemAvatar React
          component. Learn more about the properties and the CSS customization
          points.
        </p>
      </React.Fragment>
    )
  }
}

Content.propTypes = {
  // classes: PropTypes.object.isRequired,
  topicDetail: PropTypes.object.isRequired,
}

