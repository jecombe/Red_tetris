// import React from 'react';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(2),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
// }));

// const GameChat = () => {
//   const classes = useStyles();
//   return (
//     <Container component="main" maxWidth="xs">
//       <div className={classes.root}>
//         <Typography component="h1" variant="h5">
//           Chat
//         </Typography>
//         <Box className={classes.form}>
//           <Typography variant="body2">
//             Not available
//           </Typography>
//         </Box>
//       </div>
//     </Container>
//   );
// };

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import RedInput from '../RedInput';
import RedButton from '../RedButton';
import CardActions from '@material-ui/core/CardActions';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const Messages = ({ messages }) => (
  <List style={{ maxHeight: '25vh', overflow: 'auto', width: '100%' }}>
    {messages.flatMap((message, index) => [
      <ListItem alignItems="flex-start" key={index}>
        <ListItemText primary="Name says:" secondary={message}/>
      </ListItem>,
      <Divider light />,
    ])}
  </List>
);

const MessageBox = ({ onSendMessage: pushSendMessage }) => {
  const [message, setMessage] = useState('');

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={11}>
        <RedInput
          label="Message"
          name="Message"
          defaultValue=""
          disabled={false}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton aria-label="send">
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
    // <TextField
    //   fullWidth
    //   label="Message"
    //   margin="normal"
    //   multiline
    //   onChange={(evt) => setMessage(evt.target.value)}
    //   onKeyDown={(evt) => {
    //     if (evt.key === 'Enter') {
    //       evt.preventDefault();
    //       pushSendMessage(message);
    //       setMessage('');
    //     }
    //   }}
    //   rows="4"
    //   value={message}
    // />
  );
};


// export default MessageBox;


const GameChat = () => {
  const messages = ["ok", "macaille","ok", "macaille","ok", "macaille","ok", "macaille","ok", "macaille"];

  const sendMessage = (message) => {
    console.log('Message sent: ', message);
  };

  return (
    <Card>
      <CardHeader
        title="Chat"
        subheader="room: Unknown"
      />
      <Divider light />
      <CardContent>
        <Messages messages={messages} />
      </CardContent>
      <CardActions>
        <MessageBox
          onSendMessage={(message) => {
            sendMessage({ message });
          }}
        />
      </CardActions>
    </Card>
  );
};


export default GameChat;
