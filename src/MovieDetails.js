// src/MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams(); // Dobijamo ID filma iz URL-a
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "35367e70";
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API_URL}&i=${id}`);
        setMovie(response.data);
      } catch (err) {
        setError("An error occurred while fetching movie details.");
      }
    };

    fetchMovie();
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <Link to="/" className="back-button">← Back to Search</Link>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
};

export default MovieDetails;
