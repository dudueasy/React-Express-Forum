import React, {Fragment} from 'react'
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'

export default class extends React.Component {
  render() {
    return (
      <Fragment>

        <Typography variant="h3" gutterBottom>
          Title of article
        </Typography>
        <ListItem>
          <ListItemAvatar>
            <Avatar>A</Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={<span>username</span>}
            secondary={<span>createTime</span>}
          />
        </ListItem>
      </Fragment>
    )
  }
}
