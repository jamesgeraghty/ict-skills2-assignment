import React from "react";
import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies, getTopRatedMovies,getSimilarMovies, getPopularMovies, getUpcomingMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import PaginationControlled from "../components/Pagination";
const URL = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = process.env.REACT_APP_API_KEY;
const language = "&language=en-US";
const query = "&query=";

const useStyles = makeStyles();

const HomePage = (props) => {

  const classes = useStyles();
const [page, setPage] = React.useState(1);
const handlePageChange = (event, value) => {
    setPage(value);
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
 <Pagination className={classes.pagination} count={500} page={page} onChange={handlePageChange} shape="rounded" size="large" color = "standard"
 />
  </>  
  

    
);

};

export default HomePage;