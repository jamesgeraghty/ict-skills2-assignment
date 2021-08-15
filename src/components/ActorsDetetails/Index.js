
import React, { useContext,useState, useEffect  } from "react";
import { getMovieCast } from "../../api/tmdb-api";

import Grid from "@material-ui/core/Grid";



export default function MovieCast({ movie }) {
    const [stars, setStars] = useState([]);
    useEffect(() => {
      getMovieCast(movie.id).then((castAndCrew) => {
        setStars(castAndCrew.cast);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(stars)
    let castCards = stars.map((s) => (
      <Grid key={s.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Cast key={s.id} star={s} />
      </Grid>
    ));
    return (
      <>
      {stars.length > 0 ?
         castCards :
         <p>Waiting for cast details</p>
         }
      </>
    )
};