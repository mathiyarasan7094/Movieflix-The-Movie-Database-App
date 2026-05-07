import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const API_KEY = "d75fd2229cf971f44555e658248adaac";

  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {

    // MOVIE DETAILS
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    // CAST
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setCredits(data));

    // TRAILER
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {

        let video =
          data.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          ) ||
          data.results.find(
            (v) => v.type === "Teaser" && v.site === "YouTube"
          ) ||
          data.results.find((v) => v.site === "YouTube");

        setTrailer(video);

      });

  }, [id]);

  // DIRECTOR
  const director = credits.crew?.find(
    (person) => person.job === "Director"
  );

  return (

    <div className="movie-details">

      {/* TOP */}
      <div className="movie-top">

        {/* POSTER */}
        <div className="movie-poster">

          {movie?.poster_path && (

            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />

          )}

        </div>

        {/* INFO */}
        <div className="movie-info">

          <h1>{movie?.title}</h1>

          <div className="movie-meta">

            <span>⭐ {movie?.vote_average?.toFixed(1)}</span>

            <span>
              📅 {movie?.release_date?.split("-")[0]}
            </span>

          </div>

          <p className="movie-director">
            🎬 Director: {director?.name || "N/A"}
          </p>

          <p className="movie-overview">
            {movie?.overview}
          </p>

          {/* TRAILER BUTTON */}
          {trailer && (

            <button
              className="trailer-btn"
              onClick={() => setShowTrailer(true)}
            >
              ▶ Play Trailer
            </button>

          )}

        </div>

      </div>

      {/* CAST */}
      <div className="movie-cast">

        <h3>Top Cast</h3>

        <div className="cast-list">

          {credits.cast?.slice(0, 10).map((actor) => (

            <div
              key={actor.id}
              className="cast-card"
              onClick={() => navigate(`/actor/${actor.id}`)}
            >

              {actor.profile_path ? (

                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                />

              ) : (

                <div className="no-image">
                  No Image
                </div>

              )}

              <p>{actor.name}</p>

            </div>

          ))}

        </div>

      </div>

      {/* FULL SCREEN TRAILER */}
      {showTrailer && trailer && (

        <div className="trailer-modal">

          {/* CLOSE */}
          <span
            className="close-btn"
            onClick={() => setShowTrailer(false)}
          >
            ✖
          </span>

          {/* VIDEO */}
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

          {/* INFO */}
          <div className="trailer-info">

            <div className="trailer-top-bar">

              <span className="trailer-date">
                📅 {new Date(trailer.published_at).toLocaleDateString()}
              </span>

              <span className="trailer-type">
                📺 {trailer.type}
              </span>

            </div>

            <h2 className="trailer-title">
              {trailer.name}
            </h2>

          </div>

        </div>

      )}

    </div>
  );
};

export default MovieDetails;