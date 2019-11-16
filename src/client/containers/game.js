import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';	
import socket from '../api';
import {store} from '../store';
// import { justJoined } from '../actions/justJoined';
// import { appendMessage } from '../actions/appendMessage';
import { justJoined, appendMessage } from '../actions';
// import Connexion from '../components/Connexion'

/*socket.on('chat', (data) => {
	console.log('data', data);
	store.dispatch(appendMessage(data));
});
*/

/*socket.on('startGame', (data) => {
	console.log('received', data);
	store.dispatch(appendMessage(data));
});*/

/*const filterRoom = (room) =>{

	var res =  userlist.filter(function(res) {
		return res.room == '1';
	});
	return res

}*/
const Game = (props, test) => {

	console.log('Print -> ', props, test)
	const [serverRoom, setServerRoom] = useState(0)

	const [handle,setHandle] = useState('');
	const [textarea,setTextarea] = useState('');
	const [index,setIndex] = useState(0);
	const [error,setError] = useState(null);


  useEffect(() => {
    /*socket.on('getRoomActual', payload => {
			console.log('=========......>', payload.actualRoom, index)
			setServerRoom(payload.actualRoom)
			setIndex(index + 1)

			socket.on('startGame', (data) => {
				console.log('received', data);
				store.dispatch(appendMessage(data));
			});
      
		});*/

  }, [0]);

	const handleSubmit = (handle,message) => {
		// console.log("Called");
		if(handle === '' || message === '') {
			setError('Handle or message should not be null');
			return;
		}
		setError('');
		/*socket.emit('chat',{
			'handle':handle,
			'message':message,
		});*/

		/*socket.emit('startGame',{
			'handle':'hello from client',
			'message': 'coucou'
		});
		socket.on('startGame', (data) => {
			console.log('received', data);
			store.dispatch(appendMessage(data));
		});*/
	};

	/*let userRoom = props.userList.filter( function (user) {


		console.log('=========> ', user, ' ', serverRoom)
		return user.room == serverRoom
	  });*/

	return (
		<div className="App">
			
			<div id="main">
				<div id="status">
					{props.joined ? <em>You are connected</em> :<em >dont't connect</em>}
				</div>
				<div id="message" className="container">
					<h1><em><strong>Chat Messages</strong></em></h1>
				
				</div>
				<div id="form">
					<form>
						<fieldset>
							<label htmlFor="nameField">name</label>
							<input id="nameField" type="text" placeholder="name" value={handle} onChange={(e) => setHandle(e.target.value)} />
							<label htmlFor="messageField">Message</label>
							<input type='text' placeholder="Type a message..." id="messageField" value={textarea} onChange={(e) => {
								setTextarea(e.target.value);
						
							}}/>
							<input className="button-primary" type="submit" value="send" onClick={(e) => {
								e.preventDefault();
								handleSubmit(handle,textarea);
								setTextarea('');
					
							}} />
						</fieldset>
					</form>
					{error ? <blockquote>
						<p><em>Error: {error}</em></p>
					</blockquote> : null}
				</div>
			</div>

				
		</div>
      );
    };



    const mapStateToProps = (state) => {

		console.log('state print', state)
	
	  const {joined} = state.user;
	  /*const room = state.user.roomList;
		const userList = state.user.userList
		const game = state.game*/

      return {
		joined,
		/*room,
		userList,
		game*/
      };
    };
    //Connect the Redux store to the App functional Component
    export default connect(mapStateToProps)(Game);
    
    
