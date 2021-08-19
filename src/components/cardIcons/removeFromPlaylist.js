import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromPlayListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemovePlaylist = (e) => {
    e.preventDefault();
    context.removeFromPlaylist(movie);
  };
  return (
    <IconButton
      aria-label="remove from playlist"
      onClick={handleRemovePlaylist}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromPlayListIcon;