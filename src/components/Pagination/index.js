import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { getMovies } from '../../api/tmdb-api';
import { useQuery } from 'react-query';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));




export default function PaginationControlled() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const {  data, error, isLoading, isError }  = useQuery( ["discover", { page: page} ], getMovies);
  return (
    <div className={classes.root}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </div>
  );
}
