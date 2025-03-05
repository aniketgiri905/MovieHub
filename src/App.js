import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Movies from "./components/Movies";
import Navbar from "./components/navbar/Navbar";
import Banner from "./components/Banner";
import Watchlist from "./components/Watchlist";
import MovieDetails from "./components/MovieDetails";
import PopularMovies from "./components/movies/PopularMovies";
import TopRatedMovies from "./components/movies/TopRatedMovies";
import Footer from "./components/footer/Footer";
import AboutPage from "./components/footer/AboutPage";
import ContactPage from "./components/footer/ContactPage";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";
import MoviesByGenreList from "./components/movies/MoviesByGenreList";
import LoginForm from "./components/login/LoginForm";
import ForgotPassword from "./components/login/ForgotPassword";

function App() {
  let [watchlist, setWatchlist] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [searchMovie, setSearchMovie] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState("");
  const [userNavigateToLoginSignup, setUserNavigateToLoginSignup] =
    useState("login");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("isUserLoggedIn"));
    if (loggedInUser !== null) {
      setIsUserLoggedIn(loggedInUser);
    }
  }, []);

  // This function sets the login status both in the state and in localStorage
  const handleIsUserLoggedIn = (status) => {
    setIsUserLoggedIn(status);
    localStorage.setItem("isUserLoggedIn", JSON.stringify(status));
  };

  // Fetch movies (popular and top-rated) from API
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setPopularMovies(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setTopRatedMovies(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching top rated movies:", error);
      });
  }, [pageNo]);

  // Function to add a movie to the watchlist
  let handleAddtoWatchlist = (movieObj) => {
    let newWatchlist = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  // Function to remove a movie from the watchlist
  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchlist(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
  };

  // Load watchlist from localStorage if available
  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchlist(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
      <div className="main-content">
        <Navbar
          setSearchMovie={setSearchMovie}
          searchMovie={searchMovie}
          setSelectedGenreId={setSelectedGenreId}
          setUserNavigateToLoginSignup={setUserNavigateToLoginSignup}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  watchlist={watchlist}
                  popularMovies={popularMovies}
                  topRatedMovies={topRatedMovies}
                  searchMovie={searchMovie}
                />
              </>
            }
          />

          {/* Watchlist route */}
          <Route
            path="/watchlist"
            element={
              // If the user is logged in, show the watchlist, otherwise redirect to login
              isUserLoggedIn && (
                <Watchlist
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  isUserLoggedIn={isUserLoggedIn}
                  setIsUserLoggedIn={setIsUserLoggedIn}
                />
              )
            }
          />

          {/* Movie Details */}
          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchlist={watchlist}
              />
            }
          />

          {/* Movies by Genre */}
          <Route
            path="/genre/:id"
            element={
              <MoviesByGenreList
                popularMovies={popularMovies}
                topRatedMovies={topRatedMovies}
                selectedGenreId={selectedGenreId}
              />
            }
          />

          {/* Popular Movies */}
          <Route
            path="/movies/popular-movies"
            element={
              <PopularMovies
                popularMovies={popularMovies}
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchlist={watchlist}
                pageNo={pageNo}
                setPageNo={setPageNo}
              />
            }
          />

          {/* Top Rated Movies */}
          <Route
            path="/movies/top-rated-movies"
            element={
              <TopRatedMovies
                topRatedMovies={topRatedMovies}
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchlist={watchlist}
                pageNo={pageNo}
                setPageNo={setPageNo}
              />
            }
          />
        </Routes>

        <Routes>
          {/* Footer routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        <Routes>
          {/* Login and Signup routes */}
          <Route
            path="/login"
            element={
              <LoginForm
                userNavigateToLoginSignup={userNavigateToLoginSignup}
                setIsUserLoggedIn={handleIsUserLoggedIn}
                setIsForgotPassword={setIsForgotPassword}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <LoginForm
                userNavigateToLoginSignup={userNavigateToLoginSignup}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ForgotPassword setIsForgotPassword={setIsForgotPassword} />
            }
          />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
