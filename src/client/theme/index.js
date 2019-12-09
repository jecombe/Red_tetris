import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: grey,
  },
  status: {
    danger: 'orange',
  },
});

export default theme;
