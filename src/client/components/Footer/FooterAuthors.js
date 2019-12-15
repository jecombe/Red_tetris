/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const FooterAuthors = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Made by '}
    <Link color="inherit" href="https://github.com/jecombe">
      jecombe
    </Link>
    {' & '}
    <Link color="inherit" href="https://github.com/dz0nda">
      dzonda
    </Link>
    {' • '}
    {new Date().getFullYear()}
  </Typography>
);

export default FooterAuthors;
