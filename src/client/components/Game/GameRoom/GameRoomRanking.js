import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';

// import GameRankingListTable from './GameRankingListTable';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const GameRankingList = (props) => {
    const { status, players, reqGameStopped } = props;

    return (
        <Dialog
            open={status === 'FINISHED'}
            TransitionComponent={Transition}
            onClose={reqGameStopped}>
            <DialogTitle>Game Ranking</DialogTitle>
            <DialogContent>{/* <GameRankingListTable players={players} /> */}</DialogContent>
        </Dialog>
    );
};

GameRankingList.propTypes = {
    status: PropTypes.string.isRequired
};

export default GameRankingList;
