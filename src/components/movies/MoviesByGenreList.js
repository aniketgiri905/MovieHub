import React, { useEffect, useState } from "react";
import "./MoviesByGenreList.css";

const MoviesByGenreList = ({
  popularMovies,
  topRatedMovies,
  selectedGenreId,
}) => {
  const [filteredPopularMovies, setFilteredPopularMovies] = useState([]);
  const [filteredTopRatedMovies, setFilteredTopRatedMovies] = useState([]);

  // Effect to filter movies when selectedGenreId or movies change
  useEffect(() => {
    const filteredPopular = filterMoviesByGenre(popularMovies);
    const filteredTopRated = filterMoviesByGenre(topRatedMovies);

    setFilteredPopularMovies(filteredPopular);
    setFilteredTopRatedMovies(filteredTopRated);

    const combinedMovies = [
      ...filteredPopularMovies,
      ...filteredTopRatedMovies,
    ];
    console.log("combinedMovies", combinedMovies);
  }, [selectedGenreId, popularMovies, topRatedMovies]);

  const SelectedGenreIdFromLocal = localStorage.getItem("SelectedGenreId");
  const genreId = SelectedGenreIdFromLocal ? parseInt(SelectedGenreIdFromLocal.replace(/"/g, ''), 10) : null;

  const filterMoviesByGenre = (movies) => {
    const genreIdToUse = selectedGenreId
      ? Number(selectedGenreId)
      : Number(genreId);
    return movies.filter((movie) => {
      return movie.genre_ids && movie.genre_ids.includes(genreIdToUse);
    });
  };

  return (
    <div className="MoviesByGenre genre__movie-list">
      {filteredPopularMovies.length > 0 &&
        filteredPopularMovies.map((movie) => (
          <div key={movie.id} className="genre__movie-item">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div>No image available</div>
            )}
            <h3>{movie.title}</h3>
          </div>
        ))}

      {/* Display filtered top-rated movies */}
      {filteredTopRatedMovies.length > 0 &&
        filteredTopRatedMovies.map((movie) => (
          <div key={movie.id} className="genre__movie-item">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div>No image available</div>
            )}
            <h3>{movie.title}</h3>
          </div>
        ))}

      {/* If no filtered movies, display movies from localStorage */}
      {filteredPopularMovies.length === 0 &&
        filteredTopRatedMovies.length === 0 && (
          <div>No movies found for this genre.</div>
        )}
    </div>
  );
};

export default MoviesByGenreList;
