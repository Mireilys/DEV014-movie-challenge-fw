import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../models/Movie";
import styles from "../styles/MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate(); // Hook para navegación
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Poster+Available";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release year not available";
  // Obtener el primer género o mostrar "No genre" si no hay géneros
  const genre = movie.genres?.join(", ") || "Géneros no disponibles";
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      data-testid={`movie-card-${movie.id}`}
      className={styles["movie-card"]}
      onClick={handleCardClick}
    >
      <div className={styles["container-card"]}>
        <div className={styles["imange-container"]}>
          <img
            src={imageUrl}
            alt={movie.title}
            className={styles["movie-poster"]}
          />
        </div>
      </div>
      <div className={styles["movie-info"]}>
        <h2 className={styles["movie-title"]}>{movie.title}</h2>
        <p className={styles["movie-year"]}>{releaseYear}</p>
        <p className={styles["movie-genre"]}>{genre}</p>
      </div>
    </div>
  );
};

export default MovieCard;
