import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import LoginContainer from '../../containers/Login/LoginContainer';

const Login = () => (
    <Container maxWidth="sm" style={{ height: '100%', border: '1px solid yellow' }}>
        <Grid container alignItems="center" style={{ height: '100%' }}>
            <Grid item xs>
                <LoginContainer />
            </Grid>
        </Grid>
    </Container>
);

export default Login;
