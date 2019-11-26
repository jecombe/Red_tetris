import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socket from '../api';
import { store } from '../store';
import Stage from '../components/Stage'
import { playerStartGame, appGetStage, appGetPieceStart, updateStage, moveTetro, dropPlayer } from '../actions';


import GameStatus from '../components/gameStatus';
import { useInterval } from '../hooks/useInterval';



const Game = (props, test) => {
	const [dropTime, setDropTime] = useState(null);

	//const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(props);


	function PrintStage(props) {
		const stage = props;
		if (stage.stage && stage.stage.length) {

		  return <Stage stage={stage.stage} />
		}

		return 0
	  }

	  
	console.log('GAME PROPS ', props)
	const [piece, setPiece] = useState([]);

	/* Redirect user if name or room is empty but url matches "/:room[:playerName]" */
	if (!props.playerName || !props.playerRoom) props.history.push("/");



   useEffect(() => {

	socket.on('objPlayer', payload => {
		console.log('PUTE ',payload)
		props.appGetStage(payload);
	  });

	  socket.on('pieceStart', payload => {
		  console.log('PIECE START ' ,payload)
		  props.appGetPieceStart(payload);
		  setDropTime(1000);

		  //resetPlayer(payload.form)

	  });
	  socket.on('stage', payload => {
		console.log('NEW STAGE ' ,payload)
		props.updateStage(payload);
		//resetPlayer(payload.form)

	});
	  

	 
   }, []);


  const move = ({ keyCode }) => {
  
      if (keyCode === 37) {
		console.log('LEFT');
		props.moveTetro(-1)


      } else if (keyCode === 38) {
        console.log('HAUT');
      } else if (keyCode === 39) {
		console.log('RIGTH');
		
		props.moveTetro(1)
		

      } else if (keyCode === 40) {
		setDropTime(1000);

		  props.dropPlayer(1)
		console.log('BAS');
    }
  };

	const handleSubmitStatus = () => {
		props.playerStartGame({
			playerName: props.state.player.playerName,
			playerRoom: props.state.player.playerRoom
		  });

	

	};


/*	useInterval(() => {
		props.dropPlayer(1)
	  }, dropTime);
*/
	return (
		<div style={style.GameStyle} tabIndex="0" onKeyDown={(e) => move(e)}>
	<PrintStage stage={props.state.player.playerStage}/>
			<GameStatus handleSubmit={handleSubmitStatus} />
		</div>
	);
};

			// <div>
			// 	{props.joined ? <em>You are connected</em> : <em >dont't connect</em>}
			// </div>
const style = {
	GameStyle: {
		display: 'flex',
		flexGrow: '1',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100vw'
	}
}

  
const mapStateToProps = (state) => ({
	state: state,
	playerName: state.player.playerName,
	playerRoom: state.player.playerRoom
});

const mapDispatchToProps = {
	//playerLogin,
	playerStartGame,
	appGetStage,
	appGetPieceStart,
	updateStage,
	moveTetro,
	dropPlayer

	
  }

export default connect(mapStateToProps, mapDispatchToProps)(Game);


