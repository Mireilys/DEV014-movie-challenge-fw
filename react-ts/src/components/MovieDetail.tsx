import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import APIService from "../services/APIService";
import { Movie } from "../models/Movie";

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

    APIService.getMovieDetail(Number(id))
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!movie) return null; // Manejar el caso donde movie aún no está definido
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Poster+Available";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release year not available";
  // Obtener el primer género o mostrar "No genre" si no hay géneros
  const genre = movie.genres?.join(", ") || "Géneros no disponibles";

  // const handleCardClick = () => {
  //   navigate(`/movie/${movie.id}`);
  // };

  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        ← Lista de Películas
      </button>
      <img src={imageUrl} alt={movie.title} className="movie-detail-poster" />
      <div className="movie-detail-content">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p className="movie-genre">{genre}</p>
        <p className="movie-year">{releaseYear}</p>
        <p>Vote Average: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
