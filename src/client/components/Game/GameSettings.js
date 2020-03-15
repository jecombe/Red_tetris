import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import RedInput from '../Common/RedInput';
import RedButton from '../Common/RedButton';

const GameSettings = (props) => {
  const {
    playerOwner,
    playerDropTime,
    handleStart,
    handleSettings,
  } = props;

  const isOwner = (playerOwner === false ? ' not ' : ' ');

  return (
    <Card>
      <CardHeader
        title="Game settings"
        subheader={`You are${isOwner}the owner`}
      />
      <Divider light />
      <CardContent>
        <RedInput
          label="playerDropTime"
          name="playerDropTime"
          defaultValue={playerDropTime}
          disabled
        />
      </CardContent>
      <CardActions>
        <RedButton
          name="Set settings"
          handleSubmit={handleSettings}
          disabled
        />
        <RedButton
          name="Start Game"
          handleSubmit={handleStart}
          disabled={!playerOwner}
        />
      </CardActions>
    </Card>
  );
};

GameSettings.propTypes = {
  playerOwner: PropTypes.bool.isRequired,
  playerDropTime: PropTypes.number.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleSettings: PropTypes.func.isRequired,
};

export default GameSettings;
