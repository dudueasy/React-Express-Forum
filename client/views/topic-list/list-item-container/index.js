import React, {Fragment} from 'react';
import {
  ListItem, ListItemAvatar, ListItemText, Avatar
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {Home} from '@material-ui/icons'


const ListItemContainer = ({onListItemClick, topicData}) => (
  <ListItem button onClick={onListItemClick}>
    <ListItemAvatar>
      {/*<Avatar src={topicData.img}/>*/}
      <Home/>
    </ListItemAvatar>

    <ListItemText
      primary={topicData.title}
      secondary={
        `${topicData.username}
        ${topicData.reply_count}/${topicData.visit_count}
        创建时间: ${topicData.create_at} `
      }
    />
  </ListItem>
)

ListItemContainer.propTypes = {
  onListItemClick: PropTypes.func.isRequired, //eslint-disable-line
  topicData: PropTypes.object.isRequired, //eslint-disable-line
};

export default ListItemContainer
