import React, {Fragment} from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {Home} from '@material-ui/icons'
import {withStyles} from '@material-ui/core/styles'


const styles = theme => ({
  tab: {
    background: theme.palette.Secondary,
    color: 'white',
    padding: '0 5px',
    borderRadius: '2px'
  },
  primary: {
    'white-space ': 'nowrap',
    'overflow ': 'hidden',
    'text-overflow ': 'ellipsis '
  },
  secondary: {
    fontSize: 10
  },
  reply_count: {
    color: theme.palette.Secondary,
    fontWeight:
      'bold'
  }
})

const ListItemContainer = ({classes, onListItemClick, topicData}) => (
  <ListItem button onClick={onListItemClick}>
    <Avatar src={topicData.author.avatar_url}/>

    <ListItemText

      primary={(
        <div className={classes.primary}>
          <span className={classes.tab}>{topicData.tab}</span>
          <span> {topicData.title}</span>
        </div>
      )}

      secondary={(
        <div className={classes.secondary}>
          <span>
            {topicData.author.loginname}&nbsp;
          </span>
          <span className={classes.reply_count}>
             &nbsp;{topicData.reply_count}&nbsp;
          </span>
          <span>/{topicData.visit_count}</span>
          <span>
            &nbsp;创建时间: {topicData.create_at}
          </span>
        </div>
      )
      }
    />
  </ListItem>
)

ListItemContainer.propTypes = {
  classes: PropTypes.func.isRequired, //eslint-disable-line
  onListItemClick: PropTypes.func.isRequired, //eslint-disable-line
  topicData: PropTypes.object.isRequired, //eslint-disable-line
};

export default withStyles(styles)(ListItemContainer)
