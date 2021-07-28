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
import Chip from "@material-ui/core/Chip";



const useStyles = makeStyles({
  card: { maxWidth: 320, backgroundColor:"rgb(255, 132, 2)",  },
  header: { height: 30, backgroundColor:"rgb(255, 132, 2)" },
  media: { height: 500, backgroundColor:"rgb(255, 132, 2)" },
  container: { height: 420, backgroundColor:"rgb(255, 132, 2)" },
  avatar: {backgroundColor: "rgb(255, 0, 0)"},
  CardContent:{backgroundColor:"rgb(255, 255, 0)"}

 
});

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
          <Grid item xs={6}>
            <Typography variant="h6" component="p" color="primary">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" component="p" color="primary">
              <StarRateIcon fontSize="medium" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions >
      {action(movie)}
     
        <Link to={`/movies/${movie.id}`}>
          <Button variant="contained" size="h4" color="rgb(255, 0, 0)">
            More Info
          </Button>
        </Link>

        <Link to={`/movies/${movie.id}/similar`}>
          <Button variant="contained" size="h5" color="primary">
          Similar Movies 
          </Button>
        </Link>
      </CardActions>
    </Card>
  
  );
}