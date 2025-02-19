import React, { useEffect } from "react";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";
import "./PopularMovies.css";

const PopularMovies = ({
  popularMovies,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
  pageNo,
  setPageNo,
}) => {


  useEffect(() => {
    window.scroll(0,0);
  }, []);

  function pageForward() {
    setPageNo((prev) => prev + 1);
  }

  function pageBackward() {
    setPageNo((prev) => (prev === 1 ? 1 : prev - 1));
  }

  if (!popularMovies || popularMovies.length === 0) {
    return <div>Loading popular movies...</div>;
  }

  return (
    <>
      <div className="popular-movies">
        {popularMovies.map((movieObj) => {
          return (
            <div className="moviecard-wrapper" key={movieObj.id}>
              <MovieCard
                poster_path={movieObj.poster_path}
                title={movieObj.original_title}
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                movieObj={movieObj}
                watchlist={watchlist}
              />
            </div>
          );
        })}
      </div>

      <Pagination
        pageForward={pageForward}
        pageBackward={pageBackward}
        pageNumber={pageNo}
      />
    </>
  );
};

export default PopularMovies;
