import React, {Fragment} from "react"
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  SvgIcon
} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import datetimeFormatter from '../../../util/datetimeFormatter'

const style = theme => ({
  iconArea: {
    position: "absolute",
    right: 5,
    top: 0
  },
  SvgIcon: {
    position: "relative",
    top: 5
  },
  replyNumber: {
    textDecoration: 'none',
    fontWeight: "lighter",
    fontSize: 10,
    color: 'black',
  }
})

@inject(stores => ({
  topicStore: stores.topicStore
}))
@withStyles(style)
@observer
export default class Header extends React.Component {
  handleBookmarkClick = () => {
    console.log("bookmark is clicked")
  }

  handleReplyIconClick = () => {
    const replyElement = document.querySelector('#topic-detail-reply')
    window.scrollTo(0, (replyElement.offsetTop - 80))
  }

  render() {
    const {classes, topicStore} = this.props
    const {topicDetail} = topicStore
    const isCollected = true
    const replyNumber = topicDetail.replies.length

    return (
      <div style={{position: "relative"}}>
        <Typography component="h1" gutterBottom>
          {topicDetail.title}
        </Typography>

        <ListItem>
          <ListItemAvatar>
            <Avatar src={topicDetail.author.avatar_url}/>
          </ListItemAvatar>

          <ListItemText
            primary={<span>{topicDetail.author.loginname}</span>}
            secondary={<span>{datetimeFormatter(topicDetail.create_at)}</span>}
          />

          <span className={classes.iconArea}>
          {isCollected ? (
            <SvgIcon
              className={classes.SvgIcon}
              onClick={this.handleBookmarkClick}
            >
              <path
                fill="#000000"
                d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,14L17.25,7.76L15.84,6.34L11,11.18L8.41,8.59L7,10L11,14Z"
              />
            </SvgIcon>
          ) : (
            <SvgIcon
              className={classes.SvgIcon}
              onClick={this.handleBookMarkClick}
            >
              <path
                fill="#000000"
                d="M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z"
              />
            </SvgIcon>
          )}
            <SvgIcon
              className={classes.SvgIcon}
              onClick={this.handleReplyIconClick}
            >
            <path
              fill="#000000"
              d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20"
            />
          </SvgIcon>
            {replyNumber ? (
              <span className={classes.replyNumber}>{replyNumber}</span>
            ) : null}
        </span>
        </ListItem>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
}
