import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies, getTopRatedMovies,getSimilarMovies} from '../api/tmdb-api'
import {getUpcomingMovies} from '../api/tmdb-api'
//import {getTopRatedMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddPlaylistAddIcon from '../components/cardIcons/playlistAdd'

const HomePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies, getUpcomingMovies,getTopRatedMovies,getSimilarMovies)

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
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  
    
);

};

export default HomePage;