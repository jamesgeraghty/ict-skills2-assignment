//To use our custom hook
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api';
import {getCredits} from '../api/tmdb-api';
import { useQuery ,useStyles} from "react-query";
import Spinner from '../components/spinner'
import { Avatar, Chip, Paper } from "@material-ui/core";

const MovieDetailsPage = (props) => {
 // const classes = useStyles();
  const { id } = props.match.params;

  const { data: movie, error, isLoading, isError } = useQuery(["movie", { id: id }],getMovie);

  const creditsReturned = useQuery(["credits", { id: id }], getCredits);

  if (isLoading ) {
    return <Spinner />;
  }

  if (isError ) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie && creditsReturned.data? (
        <>
          <PageTemplate movie={movie} credits={creditsReturned.data}>
            <MovieDetails movie={movie} credits={creditsReturned.data}/>
          </PageTemplate>

       
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
     
    </>
  
  );
};

export default withRouter(MovieDetailsPage);