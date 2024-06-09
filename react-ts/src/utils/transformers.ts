import { Movie } from "../models/Movie";

export interface ApiMovieData {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
}
export function formatMovie(apiMovieData: ApiMovieData): Movie {
  // Transformar datos de la película de la API al modelo de negocio Movie
  const formattedMovie: Movie = {
    id: apiMovieData.id,
    title: apiMovieData.title,
    poster: apiMovieData.poster,
    overview: apiMovieData.overview,
    release_date: apiMovieData.release_date,
  };
  return formattedMovie;
}
