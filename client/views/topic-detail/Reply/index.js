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
} from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import marked from 'marked'
import datetimeFormatter from '../../../util/datetimeFormatter'

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

@inject(store => ({
  topicStore: store.topicStore
}))
@withStyles(style)
@observer
export default class Reply extends React.Component {
  render() {

    const {classes, topicStore} = this.props
    const {topicReply} = topicStore
    const loginUser = true

    return (
      <Fragment>
        <div style={{position: "relative"}}>
          <Typography variant="body">responses</Typography>
        </div>
        <div className={classes.responseArea}>
          {loginUser
            ? (
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
            )
            : null
          }
          {topicReply.map(({author: {avatar_url, loginname}, create_at, content}) => (

            <Card className={classes.Card}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={avatar_url}/>
                </ListItemAvatar>

                <ListItemText
                  primary={<span>{loginname}</span>}
                  secondary={<span>{datetimeFormatter(create_at)}</span>}
                />
              </ListItem>

              <div
                className={classes.commentTextContainer}
                dangerouslySetInnerHTML={{__html: marked(content)}}
              />
            </Card>
          ))}

        </div>
      </Fragment>
    )
  }
}

Reply.wrappedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired
}
