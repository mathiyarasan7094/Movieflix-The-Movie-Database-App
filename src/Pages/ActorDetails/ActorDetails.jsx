import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ActorDetails.css'

const ActorDetails = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const API_KEY = "d75fd2229cf971f44555e658248adaac"

  const [actor, setActor] = useState(null)
  const [movies, setMovies] = useState([])

  useEffect(() => {

    // ACTOR DETAILS
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(data => setActor(data))

    // ACTOR MOVIES
    fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(data => setMovies(data.cast))

  }, [id])

  return (

    <div className='actor-page'>

      {actor && (

        <div className='actor-header'>

          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt=""
          />

          <div className='actor-info'>

            <h1>{actor.name}</h1>

            <p>{actor.biography || "No biography available."}</p>

            <h3>🎂 Birthday: {actor.birthday || "N/A"}</h3>

            <h3>🌍 Place: {actor.place_of_birth || "N/A"}</h3>

          </div>

        </div>

      )}

      {/* MOVIES */}
      <div className='actor-movies'>

        <h2>Movies</h2>

        <div className='movies-grid'>

          {movies.map((movie) => (

            <div
              key={movie.id}
              className='movie-card'
              onClick={() => navigate(`/movie/${movie.id}/movie`)}
            >

              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450"
                }
                alt=""
              />

              <p>{movie.title}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default ActorDetails