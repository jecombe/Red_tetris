import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { chatStatePropTypes } from '../../reducers/reducers.types';

import GameChatMessage from './GameChat/GameChatMessage';
import GameChatBox from './GameChat/GameChatBox';

const useStyles = makeStyles({
    grid: {
        height: '100%'
    },
    list: {
        height: '40vh',
        overflow: 'auto'
    }
});

const GameChat = (props) => {
    const { chat, message, handleMessage, handleSubmit } = props;
    const scrollRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
        }
    }, [chat]);

    return (
        <Grid container alignItems="center" className={classes.grid}>
            <Grid item xs>
                <Tabs value={0} indicatorColor="primary" textColor="primary">
                    <Tab disabled label="#room" style={{ color: 'red' }} />
                </Tabs>
                <Paper variant="outlined" elevation={0}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <List className={classes.list}>
                                {chat.map((entryMessage) => (
                                    <GameChatMessage key={entryMessage.id} message={entryMessage} />
                                ))}
                                <div ref={scrollRef} />
                            </List>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs>
                                        <GameChatBox
                                            message={message}
                                            handleMessage={handleMessage}
                                            handleSubmit={handleSubmit}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

GameChat.propTypes = {
    chat: chatStatePropTypes.isRequired,
    message: PropTypes.string.isRequired,
    handleMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default GameChat;
