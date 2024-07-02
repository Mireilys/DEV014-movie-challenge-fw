// import { Movie } from "../models/Movie";

// export interface ApiMovieData {
//   backdrop_path: string;
//   genre_ids: number[];
//   id: number;
//   overview: string;
//   poster_path: string;
//   release_date: string;
//   title: string;
// }
// export function formatMovie(apiMovieData: ApiMovieData): Movie {
//   // Transformar datos de la película de la API al modelo de negocio Movie
//   const formattedMovie: Movie = {
//     backdrop_path: apiMovieData.backdrop_path,
//     genre_ids: apiMovieData.genre_ids,
//     id: apiMovieData.id,
//     overview: apiMovieData.overview,
//     poster_path: apiMovieData.poster_path,
//     release_date: apiMovieData.release_date,
//     title: apiMovieData.title,
//   };
//   return formattedMovie;
// }
import { Movie } from "../models/Movie";

// Interfaz para los datos de película provenientes de la API
export interface ApiMovieData {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  genres?: string[];
}

// Función para formatear los datos de la película de la API al modelo de negocio Movie
export function formatMovie(
  apiMovieData: ApiMovieData,
  genresMap: Map<number, string>
): Movie {
  // Mapa de genre_ids a nombres de géneros utilizando genresMap
  const genres: string[] =
    apiMovieData.genre_ids && apiMovieData.genre_ids.length > 0
      ? apiMovieData.genre_ids.map((id) => genresMap.get(id) || "")
      : [];

  // Filtrar géneros vacíos
  const filteredGenres = genres.filter((genre) => genre !== "");

  // Construir el objeto Movie formateado
  const formattedMovie: Movie = {
    backdrop_path: apiMovieData.backdrop_path,
    genre_ids: apiMovieData.genre_ids || [],
    id: apiMovieData.id,
    overview: apiMovieData.overview,
    poster_path: apiMovieData.poster_path,
    release_date: apiMovieData.release_date,
    title: apiMovieData.title,
    genres: filteredGenres,
  };

  return formattedMovie;
}
// Función para convertir un arreglo de géneros en un Map
export function formatGenresToMap(
  genres: { id: number; name: string }[]
): Map<number, string> {
  const genresMap = new Map<number, string>();

  genres.forEach((genre) => {
    genresMap.set(genre.id, genre.name);
  });

  return genresMap;
}

interface Genre {
  id: number;
  name: string;
}

export const formatGenresToOptions = (
  genres: Genre[]
): { value: string; label: string }[] => {
  return genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));
};
