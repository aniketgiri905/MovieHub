import React, { useEffect, useState } from "react";
import "./Movies.css";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom"; 

const Movies = ({
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
  popularMovies,
  topRatedMovies,
  searchMovie,
}) => {
  const filterMovies = (movies) => {
    return movies.filter((movieObj) =>
      movieObj.original_title
        .toLowerCase()
        .includes(searchMovie.toLowerCase())
    );
  };

  const filteredPopularMovies = filterMovies(popularMovies);
  const filteredTopRatedMovies = filterMovies(topRatedMovies);

  // Check if no movies are found in both sections
  const noMoviesFound =
    filteredPopularMovies.length === 0 && filteredTopRatedMovies.length === 0;

  return (
    <div className="Movies__movies-items">
      {/* Popular Movies Section */}
      {filteredPopularMovies.length > 0 && (
        <div className="movies-items__inner">
          <div className="movies-items__header">
            <h1>Popular Movies</h1>
            <span>
              <Link to="/movies/popular-movies">View All</Link>
            </span>
          </div>
          <div className="moviecard-wrapper">
            {filteredPopularMovies.slice(0, 12).map((movieObj) => {
              return (
                <MovieCard
                  key={movieObj.id}
                  poster_path={movieObj.poster_path}
                  title={movieObj.original_title}
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  movieObj={movieObj}
                  watchlist={watchlist}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Top Rated Movies Section */}
      {filteredTopRatedMovies.length > 0 && (
        <div className="movies-items__inner">
          <div className="movies-items__header">
            <h1>Top Rated Movies</h1>
            <span>
              <Link to="/movies/top-rated-movies">View All</Link>
            </span>
          </div>
          <div className="moviecard-wrapper">
            {filteredTopRatedMovies.slice(0, 12).map((movieObj) => {
              return (
                <MovieCard
                  key={movieObj.id}
                  poster_path={movieObj.poster_path}
                  title={movieObj.original_title}
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  movieObj={movieObj}
                  watchlist={watchlist}
                />
              );
            })}
          </div>
        </div>
      )}

      {noMoviesFound && (
        <div className="no-movies-found">
          <h2>No Movies Found</h2>
          <p>We couldn't find any movies matching your search. Please try again with different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
