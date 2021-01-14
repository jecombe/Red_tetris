import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Telegram from '@material-ui/icons/Telegram';

import RedIconButton from '../../Common/RedIconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    }
}));

const GameChatBox = (props) => {
    const { message, handleMessage, handleSubmit } = props;
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="message..."
                value={message}
                onChange={handleMessage}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            />
            <RedIconButton onClick={handleSubmit}>
                <Telegram />
            </RedIconButton>
        </Paper>
    );
};

GameChatBox.propTypes = {
    message: PropTypes.string.isRequired,
    handleMessage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default GameChatBox;
