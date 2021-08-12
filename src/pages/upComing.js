import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PlaylistAddIcon from '../components/cardIcons/playlistAdd';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
//const useStyles = makeStyles();

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

const UpcomingMoviesPage = (props) => {

  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
      setPage(value);
    };
  const {  
    data,
    error,
    isLoading, 
    isError }  = useQuery( ['upcoming', { page: page} ],  getUpcomingMovies);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(mustWatch))
  const addToPlayList = (movieId) => true 
  return (
    <>
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}

      />
       <div className={classes.root}>
     <Pagination className={classes.pagination} count={10} page={page} onChange={handlePageChange} shape="rounded" size="large" color = "standard"
     />
</div>

      </>      
    
    );
    
    };
export default UpcomingMoviesPage;