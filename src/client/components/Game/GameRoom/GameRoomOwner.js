import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import {
  settingsProp,
  playersStatePropTypes,
} from '../../../reducers/reducers.types';
import RedIconButton from '../../Common/RedIconButton';

const useStyles = makeStyles({
  icon: {
    color: 'red',
  },
});

const GameSettingsRoomOwner = (props) => {
  const { disabled, owner, players, onClickOwner } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    onClickOwner(value);
    handleClose();
  };

  const playersList = Object.entries(players);

  return (
    <>
      <RedIconButton disabled={disabled} onClick={handleClickOpen}>
        <SupervisorAccountIcon fontSize="small" />
      </RedIconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Set new room owner</DialogTitle>
        <List>
          {playersList.map((player) => (
            <ListItem
              button
              disabled={owner === player[1].name}
              onClick={() => handleListItemClick(player[1])}
              key={player[1].name}
            >
              <ListItemIcon>
                <PersonAddIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={player[1].name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

GameSettingsRoomOwner.propTypes = {
  disabled: PropTypes.bool.isRequired,
  owner: settingsProp.owner.isRequired,
  players: playersStatePropTypes.isRequired,
  onClickOwner: PropTypes.func.isRequired,
};

export default GameSettingsRoomOwner;
