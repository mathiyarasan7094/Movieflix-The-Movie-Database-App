import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Row from "../../Components/Row/Row";
import "../Page.css";

const API_KEY = "d75fd2229cf971f44555e658248adaac";

const Languages = () => {
  return (
    <div className="page">
      <Navbar />

      {/* 🇮🇳 Tamil */}
      <Row
        title=" Tamil Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ta&sort_by=popularity.desc&region=IN&page=1`}
      />

      {/* 🇮🇳 Telugu */}
      <Row
        title=" Telugu Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc&region=IN&page=1`}
      />

      {/* 🇮🇳 Hindi */}
      <Row
        title=" Hindi Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&region=IN&page=1`}
      />

      {/* 🇮🇳 Malayalam */}
      <Row
        title=" Malayalam Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=ml&sort_by=popularity.desc&region=IN&page=1`}
      />

      {/* 🇮🇳 Kannada */}
      <Row
        title=" Kannada Movies"
        fetchUrl={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=kn&sort_by=popularity.desc&region=IN&page=1`}
      />
    </div>
  );
};

export default Languages;