import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; //*se agrega el hook useSearchParams para gestionar el estado de la URL
import MovieList from "./MovieList";
import APIService from "../services/APIService";
import movieService from "../services/movieService";
import { Movie } from "../models/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";
import ListOptions from "../components/ListOptions";
import { formatGenresToOptions } from "../utils/transformers";
import styles from "../styles/Home.module.css";

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
    setIsLoading(true);
    setError(null);

    const filters = {
      page,
      genreId: selectedGenreId ? parseInt(selectedGenreId, 10) : null,
      sortBy: selectedSortBy,
    };

    APIService.getMovies({ filters })
      .then((data) => {
        //console.log("Movies fetched:", data);
        setMovies(data.movies);
        setTotalPages(data.metaData.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          "Error al recuperar películas. Por favor, inténtelo de nuevo más tarde."
        );
        setIsLoading(false);
      });
  };
  const fetchMovieGenres = () => {
    movieService
      .getMovieGenres()
      .then((genres) => {
        setGenres(genres);
      })
      .catch((error) => {});
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prevParams) => {
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
      <div
        className={styles["loading-container"]}
        data-testid="loading-spinner"
      >
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["error-container"]} data-testid="error-message">
        <div className={styles["error-message"]}>{error}</div>
      </div>
    );
  }

  const genreOptions = formatGenresToOptions(genres);
  const sortOptions = [
    { value: "popularity.desc", label: "Popularidad Descendente" },
    { value: "popularity.asc", label: "Popularidad Ascendente" },
  ];

  return (
    <div
      className={styles["home-container"]}
      data-testid="movie-list-container"
    >
      <h1 className={styles["title"]}>Mi lista de películas favoritas</h1>
      <div className={styles["home-section"]}>
        <div className={styles["genre-options"]}>
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
        <div className={styles["sort-options"]}>
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
