import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { Movie } from "../models/Movie";

describe("MovieCard", () => {
  const mockMovie: Movie = {
    backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    genre_ids: [878, 12, 28],
    id: 653346,
    overview:
      "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
    poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    release_date: "2024-05-08",
    title: "Kingdom of the Planet of the Apes",
    genres: ["Science Fiction", "Adventure", "Action"],
    vote_average: 8.5,
  };

  it("debería renderizar correctamente con los datos de la película proporcionados", () => {
    const { getByAltText, getByTestId } = render(
      <MemoryRouter>
        {" "}
        {/* Envuelve en MemoryRouter */}
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );
    const expectedPosterUrl = `https://image.tmdb.org/t/p/original${mockMovie.poster_path}`;

    const poster = getByAltText(mockMovie.title);
    expect(poster).toHaveAttribute("src", expectedPosterUrl);

    expect(getByTestId(`movie-card-${mockMovie.id}`)).toHaveTextContent(
      mockMovie.title
    );
    expect(getByTestId(`movie-card-${mockMovie.id}`)).toHaveTextContent("2024");
    expect(getByTestId(`movie-card-${mockMovie.id}`)).toHaveTextContent(
      "Science Fiction, Adventure, Action"
    );
  });

  it("debería manejar correctamente la ausencia de póster", () => {
    const movieWithoutPoster: Movie = {
      ...mockMovie,
      poster_path: null as any,
    };
    const { getByAltText } = render(
      <MemoryRouter>
        {" "}
        {/* Envuelve en MemoryRouter */}
        <MovieCard movie={movieWithoutPoster} />
      </MemoryRouter>
    );
    const expectedPlaceholderUrl =
      "https://via.placeholder.com/300x450?text=No+Poster+Available";

    const poster = getByAltText(mockMovie.title);
    expect(poster).toHaveAttribute("src", expectedPlaceholderUrl);
  });

  it("debería manejar correctamente la ausencia de géneros", () => {
    const movieWithoutGenres: Movie = { ...mockMovie, genres: [] };
    const { getByTestId } = render(
      <MemoryRouter>
        {" "}
        {/* Envuelve en MemoryRouter */}
        <MovieCard movie={movieWithoutGenres} />
      </MemoryRouter>
    );

    expect(
      getByTestId(`movie-card-${movieWithoutGenres.id}`)
    ).toHaveTextContent("Géneros no disponibles");
  });
});
