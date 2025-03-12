import React, { useEffect, useState } from "react";
import "./Watchlist.css";
import UpArrow from "../SVG/UpArrow";
import DownArrow from "../SVG/DownArrow";
import genreids from "../Utility/genre.js";
import { useNavigate } from "react-router-dom";
import CloseArrow from "../SVG/CloseArrow.js";

const Watchlist = ({
  watchlist,
  setWatchlist,
  handleRemoveFromWatchlist,
  isUserLoggedIn,
  setIsUserLoggedIn,
}) => {
  const [search, setSearch] = useState("");
  const [sortRatingOrder, setSortRatingOrder] = useState(null);
  const [sortPopularitygOrder, setSortPopularityOrder] = useState(null);
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrentGenre] = useState("All Genres");
  const navigate = useNavigate();

  useEffect(() => {
    let genreArr = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    setGenreList(["All Genres", ...genreArr]);
  }, [watchlist]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  const sortRatingIncreasing = () => {
    let sortedAcending = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortedAcending]);
    setSortRatingOrder("ratingAsc");
    setSortPopularityOrder(null);
  };

  const sortRatingDecreasing = () => {
    let sortedDecending = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sortedDecending]);
    setSortRatingOrder("ratingDesc");
    setSortPopularityOrder(null);
  };

  const sortPopularityIncreasing = () => {
    let sortedAcending = watchlist.sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity;
    });
    setWatchlist([...sortedAcending]);
    setSortPopularityOrder("popularityAsc");
    setSortRatingOrder(null);
  };

  const sortPopularityDecreasing = () => {
    let sortedDecending = watchlist.sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity;
    });
    setWatchlist([...sortedDecending]);
    setSortPopularityOrder("popularityDesc");
    setSortRatingOrder(null);
  };

  const filteredMovies = watchlist
    .filter((movieObj) => {
      if (currGenre === "All Genres") {
        return true;
      } else {
        return genreids[movieObj.genre_ids[0]] === currGenre;
      }
    })
    .filter((movieObj) => {
      return movieObj.original_title
        .toLowerCase()
        .includes(search.toLowerCase());
    });

  // if (!isUserLoggedIn) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <div className="Watchlist__movies-categary">
        <ul>
          {genreList.map((genre, index) => {
            if (genreList.indexOf(genre) === index) {
              return (
                <li
                  key={index}
                  onClick={() => handleFilter(genre)}
                  className={currGenre === genre ? "selected-genre" : ""}
                >
                  {genre}
                </li>
              );
            }
          })}
        </ul>
      </div>

      <div className="Watchlist-search">
        <input
          onChange={(e) => handleSearch(e)}
          value={search}
          type="text"
          placeholder="Search Movies"
        />
      </div>

      {/* Show a message if no movie matches search */}
      {filteredMovies.length === 0 && search !== "" && (
        <div className="Watchlist__no-results-message">
          No movies found matching "{search}"
        </div>
      )}

      {filteredMovies.length > 0 && (
        <div className="Watchlist-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className="rating-items">
                  <div className="rating">
                    Ratings{" "}
                    {sortRatingOrder === "ratingAsc" ? (
                      <div
                        className={`up-arrow ${
                          sortRatingOrder === "ratingAsc" ? "selectedArrow" : ""
                        }`}
                        onClick={sortRatingDecreasing}
                      >
                        <DownArrow />
                      </div>
                    ) : sortRatingOrder === "ratingDesc" ? (
                      <div
                        className={`down-arrow ${
                          sortRatingOrder === "ratingDesc"
                            ? "selectedArrow"
                            : ""
                        }`}
                        onClick={sortRatingIncreasing}
                      >
                        <UpArrow />
                      </div>
                    ) : (
                      <div className="up-arrow" onClick={sortRatingIncreasing}>
                        <UpArrow />
                      </div>
                    )}
                  </div>
                </th>

                <th className="popularity-items">
                  <div className="popularity">
                    Popularity{" "}
                    {sortPopularitygOrder === "popularityAsc" ? (
                      <div
                        className={`up-arrow ${
                          sortPopularitygOrder === "popularityAsc"
                            ? "selectedArrow"
                            : ""
                        }`}
                        onClick={sortPopularityDecreasing}
                      >
                        <DownArrow />
                      </div>
                    ) : sortPopularitygOrder === "popularityDesc" ? (
                      <div
                        className={`down-arrow ${
                          sortPopularitygOrder === "popularityDesc"
                            ? "selectedArrow"
                            : ""
                        }`}
                        onClick={sortPopularityIncreasing}
                      >
                        <UpArrow />
                      </div>
                    ) : (
                      <div
                        className="up-arrow"
                        onClick={sortPopularityIncreasing}
                      >
                        <UpArrow />
                      </div>
                    )}
                  </div>
                </th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movieObj) => {
                return (
                  <tr key={movieObj.id}>
                    <td>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      />
                      <span className="moviename">
                        {movieObj.original_title}
                      </span>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td>
                      <div
                        className="delete-btn"
                        onClick={() => handleRemoveFromWatchlist(movieObj)}
                      >
                        Delete
                      </div>
                      <div
                        className="res-delete-btn"
                        onClick={() => handleRemoveFromWatchlist(movieObj)}
                      >
                        <CloseArrow />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Watchlist;
