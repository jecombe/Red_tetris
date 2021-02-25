/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { playerStateProp, settingsProp } from '../../../reducers/reducers.types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameBoardLoose = (props) => {
  const { loose, rank, nbPlayers } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(loose);
  }, [loose]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} fullWidth>
        <DialogTitle>Game Over!</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Rank: ${rank}/${nbPlayers}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

GameBoardLoose.propTypes = {
  loose: playerStateProp.loose.isRequired,
  rank: playerStateProp.rank.isRequired,
  nbPlayers: settingsProp.nbPlayers.isRequired,
};

export default GameBoardLoose;
