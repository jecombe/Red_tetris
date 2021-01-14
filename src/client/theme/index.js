import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: red,
        secondary: orange
    },
    // '@global': {
    //   '*::-webkit-scrollbar': {
    //     width: '0.4em'
    //   },
    //   '*::-webkit-scrollbar-track': {
    //     '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    //   },
    //   '*::-webkit-scrollbar-thumb': {
    //     backgroundColor: 'rgba(0,0,0,.1)',
    //     outline: '1px solid slategrey'
    //   }
    // },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*': {
                    'scrollbar-width': 'thin'
                },
                '*::-webkit-scrollbar': {
                    width: '0px',
                    height: '4px'
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    outline: '1px solid slategrey'
                }
            }
        }
    },
    // typography: {
    //   fontFamily: '"Helvetica", sans-serif',
    // },
    background: {
        default: '#e8e8e851'
    }
});

export default theme;
