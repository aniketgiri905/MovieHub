import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import Pagination from "../Pagination";

const TopRatedMovies = ({
  topRatedMovies,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
  pageNo,
  setPageNo,
  totalPages,
}) => {
  const [currentMovies, setCurrentMovies] = useState([]);
  const moviesPerPage = 20;

  // Effect to update the current movies when pageNo changes
  useEffect(() => {
    window.scroll(0, 0);
    updateCurrentMovies(topRatedMovies);
  }, [pageNo, topRatedMovies]);

  const updateCurrentMovies = (movies) => {
    // Slice the topRatedMovies array to display only 20 movies per page
    const indexOfLastMovie = pageNo * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    setCurrentMovies(currentMovies);
  };

  function pageForward() {
    setPageNo((prev) => prev + 1);
  }

  function pageBackward() {
    setPageNo((prev) => (prev === 1 ? 1 : prev - 1));
  }

  if (!topRatedMovies || topRatedMovies.length === 0) {
    return <div>Loading top-rated movies...</div>;
  }

  return (
    <>
      <div className="TopRatedMovies popular-movies">
        {currentMovies.map((movieObj) => {
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
        totalPages={totalPages}
        setPageNo={setPageNo}
      />
    </>
  );
};

export default TopRatedMovies;
