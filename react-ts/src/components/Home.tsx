import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; //*se agrega el hook useSearchParams para gestionar el estado de la URL
import MovieList from "./MovieList";
import APIService from "../services/APIService";
import { Movie } from "../models/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]); // Estado para almacenar los géneros de películas
  const [searchParams, setSearchParams] = useSearchParams(); //*Llamar al servicio getMovies cada vez que cambie el query param currentPage:Utiliza un efecto para observar los cambios en currentPage y llamar a fetchMovies con el nuevo valor.
  const currentPage = parseInt(searchParams.get("currentPage") || "1");

  useEffect(() => {
    fetchMovies(currentPage);
    fetchMovieGenres(); // Llama a fetchMovieGenres al montar el componente
  }, [currentPage]);

  const fetchMovies = (page: number) => {
    console.log("Fetching movies for page:", page);
    setIsLoading(true);
    setError(null);

    APIService.getMovies({ filters: { page } })
      .then((data) => {
        console.log("Movies fetched:", data);
        setMovies(data.movies);
        setTotalPages(data.metaData.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(
          "Error al recuperar películas. Por favor, inténtelo de nuevo más tarde."
        );
        setIsLoading(false);
      });
  };
  const fetchMovieGenres = () => {
    APIService.getMovieGenres()
      .then((genres) => {
        setGenres(genres);
        console.log("Movie Genres:", genres); // Mostrar los géneros de películas en la consola
      })
      .catch((error) => {
        console.error("Error fetching movie genres:", error);
      });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ currentPage: page.toString() });
  };

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

  return (
    <div className="home-container">
      <MovieList movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onSelectPage={handlePageChange}
      />
    </div>
  );
};

export default Home;
