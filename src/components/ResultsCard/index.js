  
import React, { useContext } from "react";


export const ResultsCard = ({movie}) => {
  
    return (
        <div className="result-card">
          <div className="poster-wrapper">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            ) : (
              <div className="filler-poster" />
            )}
          </div>

          <div className="info">
           <div className="header">
            <h3 className="title">{movie.title}</h3>
             <h4 className="release-date">{movie.release_date.substring (0,4)}            
          </h4>
        </div>


        <div className="control">
          <button className="btn">Add to Watch List </button>
        </div>
        </div>
        </div>

       
    )
}
