import React, { useEffect, useState } from 'react';
import './Home.css';

import Navbar from '../../Components/Navbar/Navbar';
import Titlecards from '../../Components/Titlecards/Titlecards';
import Footer from '../../Components/Footer/Footer';

import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';

import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [hero, setHero] = useState(null);

  const navigate = useNavigate();

  const API_KEY = "d75fd2229cf971f44555e658248adaac";

  // 🔥 FETCH HERO MOVIE
  useEffect(() => {

    const fetchHero = async () => {

      try {

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        const data = await response.json();

        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];

        setHero(randomMovie);

      } catch (error) {
        console.log("Hero Fetch Error:", error);
      }

    };

    fetchHero();

  }, []);

  return (

    <div className='home'>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      {hero && (

        <div className="hero">

          {/* BACKGROUND IMAGE */}
          <img
            src={
              hero.backdrop_path
                ? `https://image.tmdb.org/t/p/original${hero.backdrop_path}`
                : "https://via.placeholder.com/1500x800"
            }
            alt={hero.title || hero.name}
            className='banner-img'
          />

          {/* DARK OVERLAY */}
          <div className="overlay"></div>

          {/* HERO CONTENT */}
          <div className="hero-caption">

            <h1>{hero.title || hero.name}</h1>

            <p>
              {hero.overview
                ? hero.overview.slice(0, 180) + "..."
                : "No description available"}
            </p>

            {/* BUTTONS */}
            <div className="hero-btns">

              {/* ▶ PLAY TRAILER */}
              <button
                className='btn'
                onClick={() => navigate(`/player/${hero.id}`)}
              >
                <img src={play_icon} alt="" />
                Play
              </button>

              {/* ℹ MOVIE DETAILS */}
              <button
                className='btn dark-btn'
                onClick={() => navigate(`/movie/${hero.id}`)}
              >
                <img src={info_icon} alt="" />
                More Info
              </button>

            </div>

          </div>

        </div>

      )}

      {/* MOVIE ROWS */}
      <div className="more-cards">

        <Titlecards
          title="Top Rated"
          category="top_rated"
          type="movie"
        />

        <Titlecards
          title="Popular Movies"
          category="popular"
          type="movie"
        />

        <Titlecards
          title="Upcoming"
          category="upcoming"
          type="movie"
        />

        <Titlecards
          title="Now Playing"
          category="now_playing"
          type="movie"
        />

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Home;