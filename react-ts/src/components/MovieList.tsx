import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../models/Movie";
import styles from "../styles/MovieList.module.css";
interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className={styles["movie-list"]}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
