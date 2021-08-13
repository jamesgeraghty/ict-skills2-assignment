import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";
import Pagination from '@material-ui/lab/Pagination';
import { useQuery } from 'react-query'

const useStyles = makeStyles({
  root: {
    padding: "20px",
    backgroundColor: "rgb(26, 24, 24)"

  },
});

function MovieListPageTemplate({ movies, title, action }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [page, setPage] = React.useState(1);
const handlePageChange = (event, value) => {
    setPage(value);
  };

  const {  data, error, isLoading, isError }  = useQuery( ["discover", { page: page} ]);

  <Pagination className={classes.pagination} count={10} page={page} onChange={handlePageChange} shape="rounded" size="large" />

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;