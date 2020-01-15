import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  roomRow: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const LoginGamesMap = (games, handleSubmitRoom) => {
  if (Object.entries(games).length === 0
      && games.constructor === Object) {
    return (
      <Grid container item justify="center">
        No rooms available
      </Grid>
    );
  }

  return Object.keys(games).map((key) => (
    <ListItem
      button
      value={key}
      key={key}
      onClick={() => handleSubmitRoom(key)}
    >
      <ListItemText primary={`${games[key].roomName}`} secondary={`Owned by ${games[key].owner}`} />
      <ListItemText primary="Game not started." />
      <LaunchIcon color="primary" />
    </ListItem>
  ));
};

const LoginRooms = (props) => {
  const { games, handleSubmitRoom } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" className={classes.roomRow}>
      <Typography component="h1" variant="h5">
        Rooms
      </Typography>
      <Grid item xs={12} style={{ maxHeight: 250, overflow: 'auto' }}>
        <List style={{ maxHeight: '100%' }}>
          {LoginGamesMap(games, handleSubmitRoom)}
        </List>
      </Grid>
    </Grid>
  );
};

LoginRooms.propTypes = {
  games: PropTypes.object.isRequired,
  handleSubmitRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  games: state.app.games,
});

export default connect(mapStateToProps, null)(LoginRooms);

// import React from 'react';

// const people = [
//   'Siri',
//   'Alexa',
//   'Google',
//   'Facebook',
//   'Twitter',
//   'Linkedin',
//   'Sinkedin',
// ];

// const FilteredList = () => {
//   const [searchTerm, setSearchTerm] = React.useState('');
//   const [searchResults, setSearchResults] = React.useState([]);
//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//   };
//   React.useEffect(() => {
//     const results = people.filter((person) => person.toLowerCase().includes(searchTerm));
//     setSearchResults(results);
//   }, [searchTerm]);
//   return (
//     <div className="App">
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchTerm}
//         onChange={handleChange}
//       />
//       <ul>
//         {searchResults.map((item) => (
//           <li>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FilteredList;
