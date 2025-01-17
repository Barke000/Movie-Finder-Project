import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "35367e70";
  const API_URL = "https://www.omdbapi.com/";

  const searchMovies = async () => {
    try {
      setError("");
      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          s: query,
        },
      });

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error || "No movies found");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  return (
    <div className="container">
      <main>
        <h1>Movie Finder</h1>
        <div className="input">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchMovies}>Submit</button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="movies">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
