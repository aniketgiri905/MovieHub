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
  totalPages,
}) => {
  const moviesPerPage = 20;

  // Scroll to the top when the page is changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo]);

  // Get the index range for slicing the movies based on the page number
  const indexOfLastMovie = pageNo * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  // Slice the popularMovies array to get the current page's movies
  const currentMovies = popularMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Page navigation functions
  const pageForward = () => {
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
    }
  };

  const pageBackward = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  if (!popularMovies || popularMovies.length === 0) {
    return <div>Loading popular movies...</div>;
  }

  return (
    <>
      <div className="PopularMovies popular-movies">
        {currentMovies.map((movieObj) => (
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
        ))}
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

export default PopularMovies;
