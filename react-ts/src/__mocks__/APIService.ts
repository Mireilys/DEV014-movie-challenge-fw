import { formatMovie } from "../utils/transformers";
import { Movie } from "../models/Movie";

let mockMovies: Movie[] = []; // Define tus datos simulados de películas aquí

const setMockMovies = (movies: Movie[]) => {
  mockMovies = movies;
};

const getMovies = () => {
  return new Promise<Movie[]>((resolve) => {
    resolve(mockMovies);
  });
};

export default {
  setMockMovies,
  getMovies,
};
