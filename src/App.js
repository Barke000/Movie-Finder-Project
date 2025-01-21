import React, { useState } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import MovieDetails from "./MovieDetails";

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

  // Handler for Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <main>
                <h1>Movie Finder</h1>
                <div className="input">
                  <input
                    type="text"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown} // Added event listener for Enter key
                  />
                  <button onClick={searchMovies}>Submit</button>
                </div>
                {error && <div className="error">{error}</div>}
                <div className="movies">
                  {movies.map((movie) => (
                    <Link
                      key={movie.imdbID}
                      to={`/movie/${movie.imdbID}`}
                      className="movie-link"
                    >
                      <div className="movie">
                        <img src={movie.Poster} alt={movie.Title} />
                        <div className="movie-info">
                          <h3>{movie.Title}</h3>
                          <p>{movie.Year}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </main>
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

