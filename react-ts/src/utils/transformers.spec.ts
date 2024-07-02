import { formatMovie } from "./transformers";
import { Movie } from "../models/Movie";
import { ApiMovieData } from "./transformers";

describe("formatMovie", () => {
  it("should transform API movie data to Movie model", () => {
    const apiMovieData: ApiMovieData = {
      backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      genre_ids: [878, 12, 28],
      id: 653346,
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      release_date: "2024-05-08",
      title: "Kingdom of the Planet of the Apes",
    };
    // Simulación de genresMap para las pruebas
    const genresMap = new Map([
      [878, "Science Fiction"],
      [12, "Adventure"],
      [28, "Action"],
    ]);
    const expectedMovie: Movie = {
      backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      genre_ids: [878, 12, 28],
      id: 653346,
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      release_date: "2024-05-08",
      title: "Kingdom of the Planet of the Apes",
      genres: ["Science Fiction", "Adventure", "Action"],
    };
    const formattedMovie = formatMovie(apiMovieData, genresMap);
    expect(formattedMovie).toEqual(expectedMovie);
  });
});
