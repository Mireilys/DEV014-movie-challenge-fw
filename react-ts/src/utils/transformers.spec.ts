import { formatMovie } from "./transformers";
import { Movie } from "../models/Movie";
import { ApiMovieData } from "./transformers";

describe("formatMovie", () => {
  it("should transform API movie data to Movie model", () => {
    const apiMovieData: ApiMovieData = {
      id: 653346,
      title: "Kingdom of the Planet of the Apes",
      poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      overview: "This is an example movie.",
      release_date: "2024-05-08",
    };
    const expectedMovie: Movie = {
      id: 653346,
      title: "Kingdom of the Planet of the Apes",
      poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      overview: "This is an example movie.",
      release_date: "2024-05-08",
    };
    const formattedMovie = formatMovie(apiMovieData);
    expect(formattedMovie).toEqual(expectedMovie);
  });
});
