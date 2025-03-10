import React, { useEffect, useState, useMemo } from "react";
import "./MovieDetails.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import CloseArrow from "../SVG/CloseArrow";
import AddToWatchList from "../SVG/AddToWatchList";

const MovieDetails = ({
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);
  const [rating, setRating] = useState("");
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie details
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US`
      )
      .then((res) => {
        setMovieDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });

    // Fetch movie videos
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US`
      )
      .then((res) => {
        setMovieVideos(res.data.results || []);
      })
      .catch((error) => {
        console.error("Error fetching movie videos:", error);
      });

    // Fetch cast and crew
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US`
      )
      .then((res) => {
        setMovieCast(res.data.cast);
        setMovieCrew(res.data.crew);
      })
      .catch((error) => {
        console.error("Error fetching movie credit:", error);
      });

    // Fetch recommended movies
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US&page=1`
      )
      .then(function (res) {
        setRecommendedMovies(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching recommended movies:", error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US&page=1`
      )
      .then(function (res) {
        setUserReviews(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching recommended movies:", error);
      });
  }, [id]);

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  // console.log("setUserReviews", userReviews);

  useEffect(() => {
    const savedRating = localStorage.getItem(`movie-${id}-rating`);
    if (savedRating) {
      setRating(Number(savedRating));
    }
  }, [id]);

  const handleRating = (rate) => {
    setRating(rate);
    localStorage.setItem(`movie-${id}-rating`, rate);
  };

  // Memoize the sliced videos to avoid unnecessary re-renders
  const videosToDisplay = useMemo(() => {
    return movieVideos.slice(0, 3);
  }, [movieVideos]);

  // watchlist
  const handleWatchlistButtonClick = (event, movie) => {
    event.stopPropagation(); // Prevent click from triggering movie card navigation

    // Check if the current movie is in the watchlist
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (isInWatchlist) {
      handleRemoveFromWatchlist(movie);
    } else {
      handleAddtoWatchlist(movie);
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="MovieDetails movie-details">
        <div className="header">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div className="header-details">
            <h1>
              {movieDetails.title}
              {movieDetails?.tagline && (
                <span className="tagline">[ {movieDetails.tagline} ]</span>
              )}
            </h1>
            <div className="genre-list">
              <ul>
                {movieDetails.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <p>{movieDetails.overview}</p>
            <div className="movie-info">
              <p>
                <span className="info-label">Status:</span>
                <span className="info-value">{movieDetails.status}</span>
              </p>
              <p>
                <span className="info-label">Release Date:</span>
                <span className="info-value">{movieDetails.release_date}</span>
              </p>
              <p>
                <span className="info-label">Budget:</span>
                <span className="info-value">{movieDetails.budget}</span>
              </p>
              <p>
                <span className="info-label">Revenue:</span>
                <span className="info-value">{movieDetails.revenue}</span>
              </p>
            </div>

            <div className="star-rating">
              <h3>Rate this Movie:</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${rating >= star ? "filled" : ""}`}
                    onClick={() => handleRating(star)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              {rating && <p>Your rating: {rating} out of 5</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="MovieDetails movie-cast">
        <div className="heading">
          <h3>Cast</h3>
        </div>
        <div className="cast-profile">
          {movieCast.slice(0, 6).map((cast) => {
            return (
              cast.profile_path && (
                <img
                  key={cast.cast_id}
                  src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                  alt={cast.name}
                />
              )
            );
          })}
        </div>
      </div>

      <div className="MovieDetails movie-crew">
        <div className="heading">
          <h3>Crew</h3>
        </div>
        <div className="crew-profile">
          {movieCrew.slice(0, 6).map((crew) => {
            return (
              crew.profile_path && (
                <img
                  key={crew.id}
                  src={`https://image.tmdb.org/t/p/original/${crew.profile_path}`}
                  alt={crew.name}
                />
              )
            );
          })}
        </div>
      </div>

      <div className="MovieDetails user-reviews">
        <div className="heading">
          <h3>User Reviews</h3>
        </div>
        {userReviews.length > 0 ? (
          <div className="reviews-list">
            {userReviews.slice(0, 4).map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                    alt={review.author_details.name}
                    className="author-avatar"
                  />
                  <div className="author-details">
                    <h4>{review.author_details.name || "Anonymous"}</h4>
                    <div className="review-rating">
                      <span className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${
                              star <= review.author_details.rating
                                ? "filled"
                                : ""
                            }`}
                          >
                            &#9733;
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="review-content">
                  <p className="content-text">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      <div className="MovieDetails videos">
        {videosToDisplay.map((video) => (
          <div key={video.id} className="trailer">
            <h4 className="video-name">{video.name}</h4>
            <iframe
              title={video.name}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      {/* Recommended Movies Section */}
      <div className="MovieDetails recommended-movies">
        <div className="heading">
          <h3>Recommended Movies</h3>
        </div>
        <div className="recommended-movie-cards">
          {recommendedMovies.map((movie) => (
            <div
              key={movie.id}
              className="recommended-movie-card"
              onClick={() => handleCardClick(movie.id)}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="recommended-movie-image"
                />
              )}
              <div className="recommended-movie-title">
                <h4>{movie.title}</h4>
              </div>
              <button
                className="watchlist-btn"
                onClick={(e) => handleWatchlistButtonClick(e, movie)}
              >
                {watchlist.some((item) => item.id === movie.id) ? (
                  <CloseArrow />
                ) : (
                  <AddToWatchList />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
