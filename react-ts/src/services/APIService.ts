import {
  formatMovie,
  formatGenresToMap,
  ApiMovieData,
} from "../utils/transformers";
import { Movie } from "../models/Movie";
import { apiConfig } from "../config/config";

class APIService {
  static getMovies(
    params: {
      filters: { page: number; genreId: number | null; sortBy: string | null };
    } = {
      filters: {
        page: 1,
        genreId: null,
        sortBy: null,
      },
    }
  ) {
    const { page, genreId, sortBy } = params.filters;
    const apiKey = apiConfig.apiKey;
    console.log("API Key:", apiKey);
    let url = `https://api.themoviedb.org/3/discover/movie?page=${page}&language=es-ES`;

    // Agregar filtro por género si se proporciona genreId
    if (genreId !== null) {
      url += `&with_genres=${genreId}`;
    }
    if (sortBy !== null) {
      url += `&sort_by=${sortBy}`;
    }

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data from API:", data);

        // Obtener los géneros y crear un mapa de géneros
        return this.getMovieGenres().then((genres) => {
          if (!genres || genres.length === 0) {
            console.warn("No genres data received from API");
            genres = [];
          }
          const genresMap = formatGenresToMap(genres);

          // Mapear películas y formatearlas con los géneros
          const movies: Movie[] = data.results.map((movie: ApiMovieData) =>
            formatMovie(movie, genresMap)
          );

          const pagination = {
            currentPage: data.page,
            totalPages: data.total_pages,
          };

          return { metaData: { pagination }, movies };
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        throw error;
      });
  }

  static getMovieGenres(): Promise<{ id: number; name: string }[]> {
    const apiKey = apiConfig.apiKey;
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=es-ES`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received genres data from API:", data);
        if (!data.genres || data.genres.length === 0) {
          console.warn("No genres data received from API");
          return [];
        }
        return data.genres; // Devuelve la lista de géneros
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        throw error;
      });
  }
  static getMovieDetail(id: number): Promise<Movie> {
    const apiKey = apiConfig.apiKey;
    console.log("API Key detail:", apiKey);
    const url = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;

    console.log("Verifying URL:", url);

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: ApiMovieData) => {
        console.log("Received movie data:", data);

        // Obtener los géneros y crear un mapa de géneros
        return this.getMovieGenres().then((genres) => {
          if (!genres || genres.length === 0) {
            console.warn("No genres data received from API");
            genres = [];
          }
          const genresMap = formatGenresToMap(genres);

          // Transformar datos de la película al modelo de negocio Movie
          const movie = formatMovie(data, genresMap);
          console.log("Formatted movie:", movie);
          return movie;
        });
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        throw error;
      });
  }
}

export default APIService;
