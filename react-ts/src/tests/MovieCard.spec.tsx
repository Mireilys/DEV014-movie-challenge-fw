import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // Asegúrate de importar jest-dom
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
  };
  it("debería renderizar correctamente con los datos de la película proporcionados", () => {
    const { getByAltText, getByText } = render(<MovieCard movie={mockMovie} />);
    const expectedPosterUrl = `https://image.tmdb.org/t/p/original${mockMovie.poster_path}`;

    const poster = getByAltText("Kingdom of the Planet of the Apes");
    expect(poster).toHaveAttribute("src", expectedPosterUrl);

    expect(getByText("Kingdom of the Planet of the Apes")).toBeInTheDocument();
    expect(getByText("2024-05-08")).toBeInTheDocument();
  });

  it("debería manejar correctamente la ausencia de póster", () => {
    const movieWithoutPoster: Movie = { ...mockMovie, poster_path: "" };
    const { getByAltText } = render(<MovieCard movie={movieWithoutPoster} />);
    const expectedPlaceholderUrl = "https://image.tmdb.org/t/p/original";

    const poster = getByAltText("Kingdom of the Planet of the Apes");
    expect(poster).toHaveAttribute("src", expectedPlaceholderUrl);
  });
});
