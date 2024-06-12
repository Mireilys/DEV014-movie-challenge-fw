import React from "react";
import { Movie } from "../models/Movie";
import "../App.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  return (
    <div data-testid="movie-card" className="movie-card">
      <img src={imageUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-year">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
