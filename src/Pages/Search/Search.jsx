import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Search.css";

const SearchResults = () => {
  const { query } = useParams();
  const API_KEY = "d75fd2229cf971f44555e658248adaac";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchAll();
  }, [query]);

  const searchAll = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();

      const filtered = data.results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      setResults(filtered);
    } catch (err) {
      console.error(err);
      setResults([]);
    }

    setLoading(false);
  };

  return (
    <div className="search-page">

      <h2 className="search-title">Results for: {query}</h2>

      {loading && <p className="status">Loading...</p>}
      {!loading && results.length === 0 && (
        <p className="status">No results found</p>
      )}

      <div className="search-grid">
        {results.map((item) => (
          <Link
            key={item.id}
            to={
              item.media_type === "movie"
                ? `/movie/${item.id}`
                : `/tv/${item.id}`
            }
            className="search-card"
          >
            <img
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                  : item.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                  : "https://via.placeholder.com/300x169"
              }
              alt=""
            />

            <p className="search-card-title">
              {item.title || item.name}
            </p>

          </Link>
        ))}
      </div>

    </div>
  );
};

export default SearchResults;