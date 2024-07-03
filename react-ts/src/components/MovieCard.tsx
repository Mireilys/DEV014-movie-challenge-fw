import React from "react";
import { Movie } from "../models/Movie";
import "../App.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Poster+Available";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release year not available";
  // Obtener el primer género o mostrar "No genre" si no hay géneros
  const genre = movie.genres?.join(", ") || "Géneros no disponibles";

  return (
    <div data-testid={`movie-card-${movie.id}`} className="movie-card">
      <div className="container-card">
        <div className="imange-container">
          <img src={imageUrl} alt={movie.title} className="movie-poster" />
        </div>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-year">{releaseYear}</p>
        <p className="movie-genre">{genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;
