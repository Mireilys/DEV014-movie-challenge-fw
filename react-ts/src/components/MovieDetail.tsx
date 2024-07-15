import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../models/Movie";
import movieService from "../services/movieService";
import styles from "../styles/MovieDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el parámetro de ruta :id
  const navigate = useNavigate(); // Usar useNavigate para navegación
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined) {
      setError("ID is undefined");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    movieService
      .getMovieDetail(Number(id))
      .then((movieData) => {
        setMovie(movieData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Navegar de regreso a la página anterior usando useNavigate
  };

  if (loading)
    return (
      <div
        className={styles["loading-container"]}
        data-testid="loading-spinner"
      >
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles["error-container"]} data-testid="error-message">
        <div className={styles["error-message"]}>{error}</div>
      </div>
    );

  if (!movie) return null; // Manejar el caso donde movie aún no está definido
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Poster+Available";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release year not available";
  // Obtener el primer género o mostrar "No genre" si no hay géneros
  // const genre = movie.genres?.join(", ") || "Géneros no disponibles";

  const renderStars = () => {
    const stars = [];
    const voteAverage = Math.round(movie.vote_average / 2); // Convertir a una escala de 5
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i < voteAverage ? "#FFD700" : "#C0C0C0"}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles["movie-detail-container"]}>
      <button className={styles["back-button"]} onClick={handleGoBack}>
        ← Lista de Películas
      </button>
      <img
        src={imageUrl}
        alt={movie.title}
        className={styles["movie-detail-poster"]}
      />
      <div className={styles["movie-detail-content"]}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        {/* <p className={styles["movie-genre"]}>{genre}</p> */}
        <p className={styles["movie-year"]}>{releaseYear}</p>
        <p className={styles["movie-rating"]}>
          {renderStars()} ({movie.vote_average})
        </p>
      </div>
    </div>
  );
};

export default MovieDetail;
