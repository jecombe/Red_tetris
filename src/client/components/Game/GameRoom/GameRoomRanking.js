import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';

import { TABLE_PLAYERS_RANK } from '../../../constants/tables';
import { settingsProp, playersStatePropTypes } from '../../../reducers/reducers.types';

import VirtualizedList from '../../Common/VirtualizedList';

const useStyles = makeStyles({
  box: {
    height: '100%',
  },
  tab: {
    fontWeight: 'bold',
  },
  paper: {
    height: '33vh',
  },
});

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const GameRankingList = (props) => {
  const { players, nbPlayers, nbLoosers } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const playersList = Object.values(players);

  useEffect(() => {
    if (nbLoosers === nbPlayers) setOpen(true);
  }, [nbLoosers]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth>
      <DialogTitle>Game Ranking</DialogTitle>
      <DialogContent>
        <Paper variant="outlined" className={classes.paper} elevation={0}>
          <VirtualizedList
            rowCount={playersList.length}
            rowGetter={({ index }) => playersList[index]}
            columns={TABLE_PLAYERS_RANK}
          />
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

GameRankingList.propTypes = {
  players: playersStatePropTypes.isRequired,
  nbLoosers: settingsProp.nbLoosers.isRequired,
  nbPlayers: settingsProp.nbPlayers.isRequired,
};

export default GameRankingList;
