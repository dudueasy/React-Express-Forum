import React, {Fragment} from "react"
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  TextField,
  Button,
  Divider,
  SvgIcon
} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
import PropTypes from 'prop-types'

const style = theme => ({
  responseArea: {
    marginTop: 20,
    marginBottom: 20
  },
  Card: {
    paddingTop: 10,
    marginBottom: 20
  },
  commentTextContainer: {
    margin: "0 20px 20px 20px"
  },
  textField: {
    marginBottom: 12
  },
  responseBubble: {
    position: "absolute",
    top: 0,
    left: 80
  }
})

@withStyles(style)
export default class Reply extends React.Component {
  render() {
    const {classes, topicReply} = this.props
    console.log(' topicReply: ', topicReply)

    return (
      <Fragment>
        <div style={{position: "relative"}}>
          <Typography variant="body">responses</Typography>
        </div>
        <div className={classes.responseArea}>
          <Card className={classes.Card}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={<span>username</span>}
                secondary={<span>createTime</span>}
              />
            </ListItem>
            <div
              className={classes.commentTextContainer}
              style={{margin: 20, marginTop: 0}}
            >
              <TextField
                id="outlined-textarea"
                placeholder="请输入评论"
                fullWidth
                multiline
                margin="normal"
                className={classes.textField}
                variant="outlined"
              />
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled
              >
                publish
              </Button>
            </div>
          </Card>
          <Card className={classes.Card}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={<span>username</span>}
                secondary={<span>createTime</span>}
              />
            </ListItem>

            <div className={classes.commentTextContainer}>
              <Typography gutterBottom variant="body1">
                ListItemAvatar The API documentation of the ListItemAvatar React
                component. Learn more about the properties and the CSS
                customization points.
              </Typography>
            </div>
          </Card>

          <Card className={classes.Card}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={<span>username</span>}
                secondary={<span>createTime</span>}
              />
            </ListItem>
            <div className={classes.commentTextContainer}>
              <Typography gutterBottom variant="body1">
                ListItemAvatar The API documentation of the ListItemAvatar React
                component. Learn more about the properties and the CSS
                customization points.
              </Typography>
            </div>
          </Card>
        </div>
      </Fragment>
    )
  }
}

Reply.propTypes = {
  classes: PropTypes.object.isRequired,
  topicReply: PropTypes.object.isRequired
}
