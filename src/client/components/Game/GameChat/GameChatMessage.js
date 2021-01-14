import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { messagePropTypes } from '../../../reducers/reducers.types';

const useStyles = makeStyles(() => ({
    user: () => ({
        fontWeight: 'bold'
    }),
    text: (props) => ({
        fontStyle: props.user === 'server' ? 'italic' : 'normal'
    })
}));

const GameChatMessage = (props) => {
    const { message } = props;
    const { user, text, date } = message;
    const classes = useStyles({ user });

    return (
        <ListItem>
            <Grid container>
                <Grid item container justify="space-between">
                    <Grid item>
                        <Typography
                            variant="body2"
                            color={user === 'server' ? 'textSecondary' : 'textPrimary'}
                            className={classes.user}
                            display="inline">
                            {user}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color="textSecondary">
                            {date}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        color={user === 'server' ? 'textSecondary' : 'textPrimary'}
                        className={classes.text}>
                        {text}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    );
};

GameChatMessage.propTypes = {
    message: messagePropTypes.isRequired
};

export default GameChatMessage;
