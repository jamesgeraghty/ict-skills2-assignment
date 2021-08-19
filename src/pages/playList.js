import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemovePlaylist from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";

const PLayListPage = () => {
  const {playListAdd: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const playListQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = playListQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = playListQueries.map((q) => q.data);
  const toDo = () => true;

  return (
    <PageTemplate
      title="Playlists"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemovePlaylist movie={movie} />
          
          </>
        );
      }}
    />
  );
};

export default PLayListPage;