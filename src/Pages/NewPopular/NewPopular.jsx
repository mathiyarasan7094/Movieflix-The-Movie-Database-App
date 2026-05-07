import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Row from "../../Components/Row/Row";
import Footer from "../../Components/Footer/Footer";
import "../Page.css";

const API_KEY = "d75fd2229cf971f44555e658248adaac";

const NewPopular = () => {
  return (
    <div className="page">
      <Navbar />

      <h1 className="page-title">New & Popular</h1>

      <Row
        title="Trending Now"
        fetchUrl={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`}
      />

      <Row
        title="Popular Movies"
        fetchUrl={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`}
      />

      <Row
        title="Now Playing"
        fetchUrl={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`}
      />

      <Row
        title="Upcoming Movies"
        fetchUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`}
      />

      <Footer />
    </div>
  );
};

export default NewPopular;