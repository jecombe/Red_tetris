import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { gameStateProp } from '../../../reducers/reducers.types';
import RedIconButton from '../../Common/RedIconButton';

const useStyles = makeStyles({
  icon: {
    color: 'red',
  },
});

const GameRoomSetOwner = (props) => {
  const {
    open, owner, players, handleClose, handleOnClickOwner,
  } = props;
  const classes = useStyles();

  const playersList = Object.entries(players);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Set new room owner</DialogTitle>
      <List>
        {playersList.map((player) => (
          <ListItem
            key={player[1].name}
            disabled={owner === player[1].name}
            onClick={() => handleOnClickOwner(player[1])}
            button
          >
            <ListItemIcon>
              <PersonAddIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={player[1].name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

GameRoomSetOwner.defaultProps = {
  players: {},
};

GameRoomSetOwner.propTypes = {
  open: PropTypes.bool.isRequired,
  owner: PropTypes.string.isRequired,
  players: gameStateProp.players,
  handleClose: PropTypes.func.isRequired,
  handleOnClickOwner: PropTypes.func.isRequired,
};

export default GameRoomSetOwner;
