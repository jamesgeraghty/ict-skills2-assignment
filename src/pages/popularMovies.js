import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getPopularMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PlaylistAddIcon from '../components/cardIcons/playlistAdd';


const PopularMoviesPage = (props) => {
  //const { id } = props.match.params
  const {  data, error, isLoading, isError }  = useQuery('popular', getPopularMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const trendingMovies = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(trendingMovies))
  const addToPlayList = (movieId) => true 
  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};
export default PopularMoviesPage;