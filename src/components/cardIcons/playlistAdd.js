import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
//import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";

const AddPlaylistAddIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToPLayList = (e) => {
    e.preventDefault();
    context.addplayList(movie);
  };
  return (
    <IconButton aria-label="add to Playlist" onClick={handleAddToPLayList}>
      <LocalActivityIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddPlaylistAddIcon;