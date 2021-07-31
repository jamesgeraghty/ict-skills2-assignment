import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies, getTopRatedMovies,getSimilarMovies, getPopularMovies, getUpcomingMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
const URL = "https://api.themoviedb.org/3/search/movie?api_key=";
const API_KEY = process.env.REACT_APP_API_KEY;
const language = "&language=en-US";
const query = "&query=";




const HomePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies, getUpcomingMovies,getTopRatedMovies,getSimilarMovies,getPopularMovies)
  const [page, setPage] = useState(1);
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
        return <AddToFavoritesIcon movie={movie}  />
        
      }}
    />
    
  

    
);

};

export default HomePage;