import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Row from "../../Components/Row/Row";
import Footer from "../../Components/Footer/Footer";
import "../Page.css";

const API_KEY = "d75fd2229cf971f44555e658248adaac";

const Movies = () => {
  return (
    <div className="page">
      <Navbar />

      <h1 className="page-title">Movies</h1>

      <Row
        title="Trending Movies"
        fetchUrl={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`}
      />

      <Row
        title="Top Rated"
        fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
      />

      <Row
        title="Popular Movies"
        fetchUrl={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`}
      />

      <Row
        title="Upcoming"
        fetchUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`}
      />

      <Row
        title="Tamil Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=popularity.desc`}
      />

      <Footer />
    </div>
  );
};

export default Movies;