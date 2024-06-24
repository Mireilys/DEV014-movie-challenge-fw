import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import APIService from "../services/APIService";
import { Movie } from "../models/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching movies...");
    setIsLoading(true);
    setError(null);

    APIService.getMovies()
      .then((movies) => {
        console.log("Movies fetched:", movies);
        setMovies(movies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(
          "Error al recuperar películas. Por favor, inténtelo de nuevo más tarde."
        );
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return <MovieList movies={movies} />;
};

export default Home;
