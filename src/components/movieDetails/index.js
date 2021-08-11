import React, {useEffect, useState} from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import YouTubeIcon from "@material-ui/icons/YouTube";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from "../movieReviews";
import Loader from "../Helper/Loader";
import { Link } from "react-router-dom";


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

const MovieDetails = ({ movie, media_type, id }) => {  
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpen2, setDrawerOpen2] = useState(false);
  const [open, setOpen] = useState(false);
 
  const [video, setVideo] = useState();
  const [videos, setVideos] = useState([]);
  
  const [credits, setCredits] = useState([]);

  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  const url = `https://api.themoviedb.org/3/movie/${id}api_key=${process.env.REACT_APP_TMDB_KEY}&&language=en-US&append_to_response=videos`;
  

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let source = axios.CancelToken.source();
  const singleRequest = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios(url, { cancelToken: source.token });

      setVideos(result.data.videos);
     
      setCredits(result.data.credits);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Singe Request Cancelled");
      } else {
        setIsError(true);
        throw error;
      }
    }
    console.log(videos);
    
    console.log(credits);
    setIsLoading(false);
  };
  useEffect(() => {
    singleRequest();

    return () => {
      source.cancel();
    };
  }, []);

  let content;
  if (isError) {
    content = <div>Error Occurred</div>;
  } else if (videos.results) {
    content = (
      <ul>
        {videos.results.map(video => (
          <li key={video.id}>{video.name}</li>
        ))}
      </ul>
    );
  
} else {
  content = <Loader />;
}

  return (
    <>
        <div>
      <div>App</div>

      <div>{movie.title}</div>
      {content}
    </div>
  
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
 <Link
        to={{pathname: `${movie.homepage}`}}
        target="_blank"
        rel="_blank">
        <Button color="primary"
        variant="contained">
        {<YouTubeIcon />}
          Movie Homepage
        </Button>
      </Link>
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
      <Paper>
    
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

      
    </>
  );
};

export default  MovieDetails ;