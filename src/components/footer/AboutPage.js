// AboutPage.js

import React from 'react';
import './AboutPage.css'; 

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Us</h1>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Welcome to our Movie Database! Our mission is to provide a comprehensive platform for movie lovers to explore the latest movies, discover new releases, and keep track of their favorites.
          </p>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <ul>
            <li>Browse popular and top-rated movies.</li>
            <li>Create and manage your personal movie watchlist.</li>
            <li>Read detailed information about movies including plot, cast, crew, and more.</li>
            <li>Watch trailers and share your favorite movies with friends.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>We are a passionate team of developers and movie enthusiasts dedicated to bringing you the best movie-watching experience.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
