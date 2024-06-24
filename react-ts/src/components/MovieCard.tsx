import React from "react";
import { Movie } from "../models/Movie";
import "../App.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release year not available";
  return (
    <div data-testid="movie-card" className="movie-card">
      <div className="container-card">
        <div className="imange-container">
          <img src={imageUrl} alt={movie.title} className="movie-poster" />
        </div>
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-year">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;
