import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getSimilarMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PlaylistAddIcon from '../components/cardIcons/playlistAdd';


const SimilarMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('similar', getSimilarMovies)

  

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
    <PageTemplate
      title='Similar'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};
export default SimilarMoviesPage;