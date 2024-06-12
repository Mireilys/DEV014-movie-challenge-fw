import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Asegúrate de importar jest-dom
import MovieList from "../components/MovieList";
import { Movie } from "../models/Movie";

describe("MovieList", () => {
  it("renders movie list correctly", () => {
    const movies: Movie[] = [
      {
        backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
        genre_ids: [878, 12, 28],
        id: 653346,
        overview:
          "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
        poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
        release_date: "2024-05-08",
        title: "Kingdom of the Planet of the Apes",
      },
      {
        backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
        genre_ids: [878, 28, 12],
        id: 823464,
        overview:
          "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        release_date: "2024-03-27",
        title: "Godzilla x Kong: The New Empire",
      },
    ];

    const { getAllByTestId, getByText } = render(<MovieList movies={movies} />);

    const movieCards = getAllByTestId("movie-card");
    expect(movieCards).toHaveLength(2);

    movies.forEach((movie) => {
      expect(getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("renders empty movie list correctly", () => {
    const movies: Movie[] = [];

    const { queryByTestId } = render(<MovieList movies={movies} />);

    const movieCards = queryByTestId("movie-card");
    expect(movieCards).toBeNull();
  });
});
