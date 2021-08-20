import React, { useContext  } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Grid from "@material-ui/core/Grid";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import "./moviesCard.css";
import { Badge } from "@material-ui/core";




const useStyles = makeStyles((theme) => ({
    

  card: { maxWidth: 320, backgroundColor:"rgb(255, 132, 2)"  },
  header: { height: 80, backgroundColor:"rgb(255, 132, 2)", display: "flex", justifyContent: "center" },
  media: { height: 500, backgroundColor:"rgb(255, 132, 2)",display: "flex", justifyContent: "center" },
  container: { height: 420, backgroundColor:"rgb(255, 132, 2)" , display: "flex", justifyContent: "center"},
  avatar: {backgroundColor: "rgb(255, 0, 0)"},
  CardContent:{backgroundColor:"rgb(255, 255, 0)",  display: "flex", justifyContent: "center"},
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

 
}));

export default function MovieCard({ movie, action }) {
  const classes = useStyles();
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const { playListAdd } = useContext(MoviesContext);

    if (favorites.find((id) => id === movie.id)) 
    {
      movie.favorite = true;
    }

    if (playListAdd.find((id) => id === movie.id))
     {
      movie.playList = true;
    }

  return (
    <div className={classes.root}>
 
    <Card className={classes.card}>
       
      
       <CardHeader       
      className={classes.header}
      avatar={
        movie.favorite ? (
          <Avatar className={classes.avatar}>
            <FavoriteIcon />
          </Avatar>
     ) : movie.playList ? (
      <Avatar className={classes.avatar}>
        <PlaylistAddCheckIcon />
      </Avatar>
    ) : null
      }
      title={
        <Typography variant="h5" component="p" >
          {movie.title}{" "}
        </Typography>
      }
    />
      <CardMedia
        className={classes.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
      
        
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="h6" component="p" color="primary">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <Grid item xs={6}>
          <Typography Similar Movies />
          < Badge  badgeContent = {movie.vote_average} variant="dot"
         variant="h3"
        color = {movie.vote_average > 6? "primary" : "secondary"} variant="h3" />
           </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions >
      {action(movie)}
     
        <Link to={`/movies/${movie.id}`}>
          <Button variant="contained" size="h6" color="rgb(255, 0, 0)">
            More Info
          </Button>
        </Link>
     
      
      </CardActions>
    </Card>
    </div>
  );
}