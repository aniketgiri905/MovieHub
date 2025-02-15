import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  let [watchlist, setWatchlist] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [searchMovie, setSearchMovie] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState("");
  const [userNavigateToLoginSignup, setUserNavigateToLoginSignup] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  console.log(popularMovies);
  console.log(topRatedMovies);
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

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchlist = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchlist(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchlist(JSON.parse(moviesFromLocalStorage));
  }, []);

  //  const abc = () => {
  //   const res = fetch ("http://localhost:3005/watchlist")
  //     .then((res)=>{
  //       console.log("res", res);
  //     })
  //  }

  return (
    <>
      <div className="main-content">
        <BrowserRouter>
          <Navbar
            setSearchMovie={setSearchMovie}
            searchMovie={searchMovie}
            setSelectedGenreId={setSelectedGenreId}
            setUserNavigateToLoginSignup={setUserNavigateToLoginSignup}
            isUserLoggedIn={isUserLoggedIn}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />

          <Routes>
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
            
            <Route
              path="/watchlist"
              element={
                <>
                  <Watchlist
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                    handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  />
                </>
              }
            />

            <Route
              path="/movie/:id"
              element={
                <>
                  <MovieDetails />
                </>
              }
            />

            <Route
              path="/genre/:id"
              element={
                <>
                  <MoviesByGenreList
                    popularMovies={popularMovies}
                    topRatedMovies={topRatedMovies}
                    selectedGenreId={selectedGenreId}
                  />
                </>
              }
            />

            <Route
              path="/movies/popular-movies"
              element={
                <>
                  <PopularMovies
                    popularMovies={popularMovies}
                    handleAddtoWatchlist={handleAddtoWatchlist}
                    handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                    watchlist={watchlist}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                  />
                </>
              }
            />

            <Route
              path="/movies/top-rated-movies"
              element={
                <>
                  <TopRatedMovies
                    topRatedMovies={topRatedMovies}
                    handleAddtoWatchlist={handleAddtoWatchlist}
                    handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                    watchlist={watchlist}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                  />
                </>
              }
            />
          </Routes>

          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>

          <Routes>
            <Route
              path="/login"
              element={<LoginForm userNavigateToLoginSignup={userNavigateToLoginSignup} setIsUserLoggedIn={setIsUserLoggedIn}/>}
            />
            <Route
              path="/sign-up"
              element={<LoginForm userNavigateToLoginSignup={userNavigateToLoginSignup}/>}
            />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
