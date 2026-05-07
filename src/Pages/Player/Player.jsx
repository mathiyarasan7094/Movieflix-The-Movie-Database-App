import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Player.css";

const Player = () => {
  const { id } = useParams();
  const API_KEY = "d75fd2229cf971f44555e658248adaac";

  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const trailerVideo = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(trailerVideo);
      });
  }, [id]);

  return (
    <div className="player">

      {trailer ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
        ></iframe>
      ) : (
        <h2>No Trailer Available</h2>
      )}

    </div>
  );
};

export default Player;