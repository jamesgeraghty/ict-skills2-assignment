import React from "react";
import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies, getTopRatedMovies,getSimilarMovies, getPopularMovies, getUpcomingMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



const HomePage = (props) => {

  const classes = useStyles();
const [page, setPage] = React.useState(1);
const handlePageChange = (_event, value) => {
    setPage(value);
    console.log(_event);
  };

const {  data, error, isLoading, isError }  = useQuery( ["discover", { page: page} ], getMovies);

  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  const playList = movies.filter(m => m.playList)
  localStorage.setItem('playlist', JSON.stringify(playList))
  const addToPlayList = (movieId) => true  
  
  return (      
    
  <>
  <PageTemplate
    
    title="Discover Movies"
    movies={movies}
    action={(movie) => {
      return <AddToFavoritesIcon movie={movie}  />      
    }}

  />
    <div className={classes.root}>
     <Pagination className={classes.pagination} count={500} page={page} onChange={handlePageChange} shape="rounded" size="large" color = "standard"
     />
</div>
  </>  
  
);

};

export default HomePage;