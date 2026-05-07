import React, { useEffect, useRef, useState } from 'react';
import './Titlecards.css';
import { useNavigate } from 'react-router-dom';

const API_KEY = "d75fd2229cf971f44555e658248adaac"; // ⚠️ don't hardcode in production

const Titlecards = ({ title, category, type = "movie" }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    let url = "";

    // 🎬 MOVIES
    if (type === "movie") {
      url = `https://api.themoviedb.org/3/movie/${category || "now_playing"}?api_key=${API_KEY}&language=en-US&page=1`;
    }

    // 📺 TV SHOWS
    if (type === "tv") {
      url = `https://api.themoviedb.org/3/tv/${category || "popular"}?api_key=${API_KEY}&language=en-US&page=1`;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        const filtered = data.results?.filter(
          item => item.poster_path || item.backdrop_path
        );

        setApiData(filtered || []);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, [category, type]);

  // 🔥 Scroll
  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <div className="title-cards">

      <h2>{title || "Trending Now"}</h2>

      <div className="card-wrapper">

        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>

        <div className="card-list" ref={cardsRef}>

          {apiData.length === 0 && <p className="loading">Loading...</p>}

          {apiData.map((card) => {

            const image = card.backdrop_path || card.poster_path;
            const name = card.title || card.name;

            return (
              <div
                key={card.id}
                className="card"
                onClick={() => navigate(`/movie/${card.id}`)} // ✅ FIXED ROUTE
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${image}`}
                  alt={name}
                />
                <p>{name}</p>
              </div>
            );
          })}

        </div>

        <button className="scroll-btn right" onClick={scrollRight}>›</button>

      </div>

    </div>
  );
};

export default Titlecards;