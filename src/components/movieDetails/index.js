import React, { useState} from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import Fab from "@material-ui/core/Fab";
//import { getSimilarMovies } from "../api/tmdb-api";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";


import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";


//import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from "../movieReviews"
import SimilarMovies from "../similarMovies";
import MovieCard from "../movieCard";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  button: {
    position: "fixed",
    bottom: theme.spacing(12),
    right: theme.spacing(12),
  },
  
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(12),
  },

 
}));

const MovieDetails = ({ movie, action }) => {  
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpen2, setDrawerOpen2] = useState(false);

  


  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
     </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" className={classes.root}>
        <li>
          <Chip label="Genres" className={classes.chip} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} className={classes.chip} 
            />
          </li>
        ))}
      </Paper>


      
      <Paper component="ul" className={classes.root}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} 
        />
        <Chip label={`Popularity: ${movie.popularity}`} 
        />
        <Chip label={`Adult: ${movie.adult}`} 
        />
      </Paper>



      <Paper component="ul" className={classes.root}>
        <li>
          <Chip label="Production Countries" className={classes.chip} color="primary" />
        </li>
        {movie.production_companies.map((p) => (
          <li key={p.origin_country}>
            <Chip label={p.origin_country} className={classes.chip} />
          </li>
        ))}
      </Paper>
     
      <Button
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen2(true)}
        className={classes.button}
      >        
        <ArrowForwardIosIcon />
        Similar Movies
      </Button>
      <Drawer anchor="top" open={drawerOpen2} onClose={() => setDrawerOpen2(false)}>
        <MovieDetails movie={movie} />
      </Drawer>
     
     
     
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        className={classes.fab}
      >        
        <NavigationIcon />
        Read Reviews
      </Fab>
      
      <Drawer anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      <CardActions disableSpacing>
      {action(movie)}
     
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info
          </Button>
        </Link>

        <Link to={`/movies/${movie.id}/similar`}>
          <Button variant="outlined" size="medium" color="primary">
          Similar Movies 
          </Button>
        </Link>
      </CardActions>
      
    </>
  );
};

export default  MovieDetails ;