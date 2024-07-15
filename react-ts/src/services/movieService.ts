import {
  formatMovie,
  formatGenresToMap,
  ApiMovieData,
} from "../utils/transformers";
import { Movie } from "../models/Movie";
import { apiConfig } from "../config/config";

class movieService {
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
        // Obtener los géneros y crear un mapa de géneros
        return this.getMovieGenres().then((genres) => {
          if (!genres || genres.length === 0) {
            console.warn("No genres data received from API");
            genres = [];
          }
          const genresMap = formatGenresToMap(genres);

          // Transformar datos de la película al modelo de negocio Movie
          const movie = formatMovie(data, genresMap);
          return movie;
        });
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        throw error;
      });
  }
}
export default movieService;
