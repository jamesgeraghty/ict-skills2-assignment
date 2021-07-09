import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PlaylistAddIcon from '../components/cardIcons/playlistAdd';


const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

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
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;