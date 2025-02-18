import React, { useState } from "react";
import Logo from "../../Logo/camlogo.jpg";
import "./Navbar.css";
import Hanburger from "../../SVG/Hanburger";
import genreids from "../../Utility/genre.js";
import BlueDownArrow from "../../SVG/BlueDownArrow.js";
import BlueUpArrow from "../../SVG/BlueUpArrow.js";
import { useNavigate } from "react-router";

const Navbar = ({
  setSearchMovie,
  setSelectedGenreId,
  setUserNavigateToLoginSignup,
  isUserLoggedIn,
  setIsUserLoggedIn,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [genreList, setGenreList] = useState(false);
  const navigate = useNavigate();

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

  const handleMoviesByGenre = (id) => {
    setSelectedGenreId(id);
    localStorage.setItem("SelectedGenreId", id);
    navigate(`genre/${id}`);
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
    <div className="navbar">
      <a href="/" className="logo-link">
        <img className="nav-logo" src={Logo} alt="logo" />
      </a>
      <div className="navbar-links">
        <input
          type="text"
          placeholder="Search Movies"
          onChange={(e) => handleMovieSearch(e)}
        />

        <a className="navbar-item" href="/">
          Movies
        </a>
        <a className="navbar-item" onClick={handleWatchListClick}>
          WatchList
        </a>

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
            <span onClick={handleGenreList}>
              {genreList ? <BlueUpArrow /> : <BlueDownArrow />}
            </span>
          </h4>
          <div className="li-items">
            {genreList &&
              Object.entries(genreids).map(([id, genre]) => {
                return (
                  <li key={id} onClick={() => handleMoviesByGenre(id)}>
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
