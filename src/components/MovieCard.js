import React from "react";
import "./MovieCard.css";
import AddToWatchList from "../SVG/AddToWatchList";
import CloseArrow from "../SVG/CloseArrow";
import { useNavigate } from "react-router";

const MovieCard = ({
  poster_path,
  title,
  movieObj,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movieObj.id}`);
  };

  const isInWatchlist = watchlist.some(item => item.id === movieObj.id);

  const handleWatchlistButtonClick = (event) => {
    event.stopPropagation(); // Prevent click from triggering movie card navigation
    if (isInWatchlist) {
      handleRemoveFromWatchlist(movieObj);
    } else {
      handleAddtoWatchlist(movieObj);
    }
  };

  return (
    <div
      className="moviecard-items"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
      onClick={handleCardClick}
    >
      <div className="movie-title">{title}</div>
      <button
        className="watchlist-btn"
        onClick={handleWatchlistButtonClick}
      >
        {isInWatchlist ? <CloseArrow /> : <AddToWatchList />}
      </button>
    </div>
  );
};

export default MovieCard;
