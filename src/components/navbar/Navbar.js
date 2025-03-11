import React, { useEffect, useState } from "react";
import Logo from "../../Logo/camlogo.jpg";
import "./Navbar.css";
import Hanburger from "../../SVG/Hanburger";
import genreids from "../../Utility/genre.js";
import BlueDownArrow from "../../SVG/BlueDownArrow.js";
import BlueUpArrow from "../../SVG/BlueUpArrow.js";
import { useLocation, useNavigate } from "react-router";
import FullMoon from "../../SVG/FullMoon.js";
import Sun from "../../SVG/Sun.js";

const Navbar = ({
  setSearchMovie,
  selectedGenreId,
  setSelectedGenreId,
  setUserNavigateToLoginSignup,
  isUserLoggedIn,
  setIsUserLoggedIn,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [genreList, setGenreList] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, []);

  useEffect(() => {
    const isGenrePage = location.pathname.startsWith("/genre/");
    if (isGenrePage) {
      const savedGenreId = localStorage.getItem("SelectedGenreId");
      if (savedGenreId) {
        setSelectedGenreId(savedGenreId);
      }
    } else {
      setSelectedGenreId(null);
    }
  }, [location.pathname, setSelectedGenreId]);

  // Toggle theme mode and update localStorage
  const toggleTheme = () => {
    const newThemeMode = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);

    if (newThemeMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("themeMode", newThemeMode);
  };

  const handleMovieSearch = (e) => {
    setSearchMovie(e.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  const handleGenreList = () => {
    setGenreList(!genreList);
  };

  const handleMoviesByGenre = (id, genre) => {
    setSelectedGenreId(id);
    localStorage.setItem("SelectedGenreId", id);
    navigate(`genre/${genre}`);
    setIsSidebarOpen(false);
  };

  const handleUserLogin = () => {
    setIsSidebarOpen(false);
    setUserNavigateToLoginSignup("login");
    navigate(`/login`);
  };

  const handleUserSignup = () => {
    setIsSidebarOpen(false);
    setUserNavigateToLoginSignup("signup");
    navigate(`/sign-up`);
  };

  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.setItem("isUserLoggedIn", JSON.stringify(false));
    setIsSidebarOpen(false);
    navigate("./");
  };

  const handleWatchListClick = () => {
    if (!isUserLoggedIn) {
      setUserNavigateToLoginSignup("login");
      localStorage.setItem("redirectTo", "/watchlist");
      navigate(`/login`);
    } else {
      navigate(`/watchlist`);
    }
  };

  return (
    <div className="Navbar">
      <a href="/" className="logo-link">
        <img className="nav-logo" src={Logo} alt="logo" />
      </a>
      <div className="navbar-links">
        <input
          type="text"
          placeholder="Search Movies"
          onChange={(e) => handleMovieSearch(e)}
        />

        {/* <a className="navbar-item" href="/">
          Movies
        </a> */}
        <a className="navbar-item" onClick={handleWatchListClick}>
          WatchList
        </a>

        {/* Toggle Switch for Theme (Sun/Moon Icons) */}
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round">
            {isDarkMode ? <FullMoon /> : <Sun />}
          </span>
        </label>

        <div onClick={toggleSidebar} className="hamburger">
          <Hanburger />
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-close" onClick={closeSidebar}>
          <span>&times;</span>
        </div>
        <ul className="sidebar-tabs">
          <li>
            <a href="/">Home</a>
          </li>
          <li className="res-navbar-item">
            <a onClick={handleWatchListClick}>WatchList</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
        </ul>

        <ul className="navbar_genre-list">
          <h4>
            Genre List{" "}
            <span onClick={handleGenreList} className="genre-list__act-btn">
              {genreList ? <BlueUpArrow /> : <BlueDownArrow />}
            </span>
          </h4>
          <div className="li-items">
            {genreList &&
              Object.entries(genreids).map(([id, genre]) => {
                const isSelected = id === selectedGenreId;
                return (
                  <li
                    key={id}
                    onClick={() => handleMoviesByGenre(id, genre)}
                    className={isSelected ? "selected-genre" : ""}
                  >
                    {genre}
                  </li>
                );
              })}
          </div>
        </ul>

        {isUserLoggedIn ? (
          <div className="loggedin-section">
            <button className="tabs" onClick={handleUserLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="loggedin-section">
            <button className="tabs" onClick={handleUserLogin}>
              Log In
            </button>
            <button className="tabs" onClick={handleUserSignup}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
