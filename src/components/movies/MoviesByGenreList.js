import React, { useEffect, useState } from "react";
import "./MoviesByGenreList.css";
import Pagination from "../Pagination";
import MovieCard from "../MovieCard"; // Import the MovieCard component
import { useNavigate } from "react-router";

const MoviesByGenreList = ({
  popularMovies,
  topRatedMovies,
  selectedGenreId,
  pageNo,
  setPageNo,
  watchlist,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
}) => {
  const [filteredPopularMovies, setFilteredPopularMovies] = useState([]);
  const [filteredTopRatedMovies, setFilteredTopRatedMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const moviesPerPage = 20;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo]);

  // Reset the page number when selectedGenreId changes
  useEffect(() => {
    setPageNo(1);
  }, [selectedGenreId, popularMovies, topRatedMovies, setPageNo]);

  // Effect to filter movies when selectedGenreId or movies change
  useEffect(() => {
    const filteredPopular = filterMoviesByGenre(popularMovies);
    const filteredTopRated = filterMoviesByGenre(topRatedMovies);

    setFilteredPopularMovies(filteredPopular);
    setFilteredTopRatedMovies(filteredTopRated);

    // Update current movies for pagination
    updateCurrentMovies(filteredPopular, filteredTopRated);

    // Set loading to false after movies are filtered and ready
    setLoading(false); // Stop loading once movies are filtered
  }, [selectedGenreId, popularMovies, topRatedMovies]);

  useEffect(() => {
    // Update the current movies list when the page changes
    updateCurrentMovies(filteredPopularMovies, filteredTopRatedMovies);
  }, [pageNo, filteredPopularMovies, filteredTopRatedMovies]);

  const updateCurrentMovies = (filteredPopular, filteredTopRated) => {
    // Combine both lists of filtered movies
    const combinedMovies = [...filteredPopular, ...filteredTopRated];

    // Calculate the current set of movies to display based on the page
    const indexOfLastMovie = pageNo * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

    const currentMovies = combinedMovies.slice(
      indexOfFirstMovie,
      indexOfLastMovie
    );
    setCurrentMovies(currentMovies);
  };

  const SelectedGenreIdFromLocal = localStorage.getItem("SelectedGenreId");
  const genreId = SelectedGenreIdFromLocal
    ? parseInt(SelectedGenreIdFromLocal.replace(/"/g, ""), 10)
    : null;

  const filterMoviesByGenre = (movies) => {
    const genreIdToUse = selectedGenreId
      ? Number(selectedGenreId)
      : Number(genreId);
    return movies.filter((movie) => {
      return movie.genre_ids && movie.genre_ids.includes(genreIdToUse);
    });
  };

  const pageForward = () => {
    setPageNo((prev) => prev + 1);
  };

  const pageBackward = () => {
    setPageNo((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const shouldShowPagination =
    currentMovies.length === moviesPerPage ||
    currentMovies.length > moviesPerPage;

  return (
    <>
      <div className="MoviesByGenre genre__movie-list">
        {/* Display loader while movies are being loaded */}
        {loading && <div className="loader">Loading...</div>}

        {/* Display filtered popular movies using MovieCard */}
        {currentMovies.length > 0 &&
          !loading &&
          currentMovies.map((movie) => (
            <div key={movie.id} className="genre__movie-item">
              <MovieCard
                poster_path={movie.poster_path}
                title={movie.title}
                movieObj={movie}
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchlist={watchlist}
              />
            </div>
          ))}

        {/* If no filtered movies, display message */}
        {!loading && currentMovies.length === 0 && (
          <div>No movies found for this genre.</div>
        )}
      </div>

      {shouldShowPagination && !loading && (
        <Pagination
          pageForward={pageForward}
          pageBackward={pageBackward}
          pageNumber={pageNo}
          setPageNo={setPageNo}
        />
      )}
    </>
  );
};

export default MoviesByGenreList;
