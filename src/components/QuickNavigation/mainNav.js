import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
   
    position: "fixed",
       bottom: 0,
    width: 400,  
 
    borderRadius: 30,
    background: ' #FE6B8B ',
    zIndex: 100,
    padding: '20px',
   
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push("/movies/favorites");
    } else if (value === 1) {
      history.push("/movie/playlist");
    } else if (value === 2) {
      history.push("/movies/search");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Favorites"
        icon={<FavoriteIcon/>}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Must Watch"
        icon={<MovieIcon />}
      />
    
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
