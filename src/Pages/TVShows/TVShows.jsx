import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Row from "../../Components/Row/Row";
import Footer from "../../Components/Footer/Footer";
import "../Page.css";

const API_KEY = "d75fd2229cf971f44555e658248adaac";

const TVShows = () => {
  return (
    <div className="page">
      <Navbar />

      <h1 className="page-title">TV Shows</h1>

      <Row
        title="Popular TV Shows"
        fetchUrl={`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`}
      />

      <Row
        title="Trending This Week"
        fetchUrl={`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`}
      />

      <Row
        title="Top Rated TV Shows"
        fetchUrl={`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`}
      />

      <Row
        title="Currently Airing"
        fetchUrl={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`}
      />

      <Row
        title="Airing Today"
        fetchUrl={`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`}
      />

      <Footer />
    </div>
  );
};

export default TVShows;