import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; //*se agrega el hook useSearchParams para gestionar el estado de la URL
import MovieList from "./MovieList";
import APIService from "../services/APIService";
import { Movie } from "../models/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";
import ListOptions from "../components/ListOptions";
import { formatGenresToOptions } from "../utils/transformers";

interface Option {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]); // Estado para almacenar los géneros de películas
  const [searchParams, setSearchParams] = useSearchParams(); //*Llamar al servicio getMovies cada vez que cambie el query param currentPage:Utiliza un efecto para observar los cambios en currentPage y llamar a fetchMovies con el nuevo valor.
  const currentPage = parseInt(searchParams.get("currentPage") || "1", 10);
  const selectedGenreId = searchParams.get("genreId") ?? null;
  const selectedSortBy = searchParams.get("sortBy") ?? null;

  useEffect(() => {
    fetchMovies(currentPage);
    fetchMovieGenres(); // Llama a fetchMovieGenres al montar el componente
  }, [currentPage, selectedGenreId, selectedSortBy]);

  const fetchMovies = (page: number) => {
    console.log("Fetching movies for page:", page);
    setIsLoading(true);
    setError(null);

    const filters = {
      page,
      genreId: selectedGenreId ? parseInt(selectedGenreId, 10) : null,
      sortBy: selectedSortBy,
    };

    APIService.getMovies({ filters })
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
    setSearchParams((prevParams) => {
      console.log("que recibe", setSearchParams);
      prevParams.set("currentPage", page.toString());
      return prevParams;
    });
  };

  const handleGenreChange = (option: Option | null) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams.toString());

      if (option) {
        newParams.set("genreId", option.value);
      } else {
        newParams.delete("genreId");
      }

      return newParams;
    });
  };

  const handleSortChange = (option: Option | null) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams.toString());

      if (option) {
        newParams.set("sortBy", option.value);
      } else {
        newParams.delete("sortBy");
      }

      return newParams;
    });
  };
  if (isLoading) {
    return (
      <div className="loading-container" data-testid="loading-spinner">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" data-testid="error-message">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const genreOptions = formatGenresToOptions(genres);
  const sortOptions = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    // Agrega más opciones de ordenamiento según sea necesario
  ];

  return (
    <div className="home-container" data-testid="movie-list-container">
      <h1 className="title">Mi lista de películas favoritas</h1>
      <div className="home-section">
        <div className="genre-options">
          <ListOptions
            options={genreOptions}
            selectedOption={
              selectedGenreId
                ? {
                    value: selectedGenreId.toString(),
                    label: selectedGenreId.toString(),
                  }
                : null
            }
            onChange={handleGenreChange}
            onClear={() =>
              setSearchParams((prevParams) => {
                prevParams.delete("genreId");
                return prevParams;
              })
            }
            label="Filtrar por género" // Pasar el texto deseado como `label`
          />
        </div>
        <div className="sort-options">
          <ListOptions
            options={sortOptions}
            selectedOption={
              selectedSortBy
                ? {
                    value: selectedSortBy.toString(),
                    label: selectedSortBy.toString(),
                  }
                : null
            }
            onChange={handleSortChange}
            onClear={() =>
              setSearchParams((prevParams) => {
                prevParams.delete("sortBy");
                return prevParams;
              })
            }
            label="Ordenar" // Pasar el texto deseado como `label`
          />
        </div>
      </div>

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
