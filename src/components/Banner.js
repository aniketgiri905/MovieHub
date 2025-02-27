import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=1ac79c500b8c1cb82335bb8918cac0fb&language=en-US&page=1`
      )
      .then((res) => {
        setBanner(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching latest movies:", error);
      });
  }, []);

  const handleBannerClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const totalMovies = banner.length;

  // Adjust currentIndex to loop back to 0 when reaching the end
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalMovies);
    }, 1000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [banner, totalMovies]);

  return (
    <div className="Banner">
      <div
        className="banner-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banner.map((movieObj, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}
            alt="movie poster"
            onClick={() => handleBannerClick(movieObj.id)}
          />
        ))}
        {/* Duplicate the images for seamless looping */}
        {banner.map((movieObj, index) => (
          <img
            key={`duplicate-${index}`}
            src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}
            alt="movie poster"
            onClick={() => handleBannerClick(movieObj.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
