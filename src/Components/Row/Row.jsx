import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Row.css";

const Row = ({ title, fetchUrl, isLarge = false }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const rowRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fetchUrl);
        const json = await res.json();

        const filtered = json.results?.filter(
          (item) => item.poster_path
        );

        setData(filtered || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <div className={`row ${isLarge ? "large" : ""}`}>
      <h2>{title}</h2>

      <div className="row-container">
        <button className="arrow left" onClick={scrollLeft}>‹</button>

        <div className="row-posters" ref={rowRef}>
          {data.length === 0 && <p className="loading">Loading...</p>}

          {data.map((item) => (
            <img
              key={item.id}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              onClick={() => navigate(`/movie/${item.id}`)} // ✅ FIXED
              className="poster"
            />
          ))}
        </div>

        <button className="arrow right" onClick={scrollRight}>›</button>
      </div>
    </div>
  );
};

export default Row;