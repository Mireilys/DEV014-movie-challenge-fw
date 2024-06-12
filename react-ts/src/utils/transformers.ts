import { Movie } from "../models/Movie";

export interface ApiMovieData {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}
export function formatMovie(apiMovieData: ApiMovieData): Movie {
  // Transformar datos de la película de la API al modelo de negocio Movie
  const formattedMovie: Movie = {
    backdrop_path: apiMovieData.backdrop_path,
    genre_ids: apiMovieData.genre_ids,
    id: apiMovieData.id,
    overview: apiMovieData.overview,
    poster_path: apiMovieData.poster_path,
    release_date: apiMovieData.release_date,
    title: apiMovieData.title,
  };
  return formattedMovie;
}
