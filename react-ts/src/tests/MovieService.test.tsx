import movieService from "../services/movieService";
import { Movie } from "../models/Movie";

// Mock de configuración fuera de la prueba
jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));

describe("MovieService", () => {
  describe("getMovieGenres", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation((url) => {
        if (url.includes("genre/movie/list")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                genres: [
                  { id: 28, name: "Action" },
                  { id: 12, name: "Adventure" },
                ],
              }),
          });
        }
        return Promise.reject(new Error("Unknown URL"));
      });
    });

    afterEach(() => {
      (global.fetch as jest.Mock).mockClear();
    });

    it("fetches movie genres successfully", async () => {
      const genres = await movieService.getMovieGenres();

      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/genre/movie/list?language=es-ES",
        {
          headers: {
            Authorization: `Bearer your_mock_api_key`,
          },
        }
      );

      expect(genres.length).toBe(2);
      expect(genres[0].name).toBe("Action");
      expect(genres[1].name).toBe("Adventure");
    });
  });

  describe("getMovieDetail", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation((url) => {
        if (url.includes("movie")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                id: 653346,
                title: "Kingdom of the Planet of the Apes",
                backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
                genre_ids: [878, 12, 28],
                overview:
                  "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
                poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
                release_date: "2024-05-08",
              }),
          });
        }
        return Promise.reject(new Error("Unknown URL"));
      });
    });

    afterEach(() => {
      (global.fetch as jest.Mock).mockClear();
    });

    test("fetches movie details successfully", async () => {
      const movieId = 653346;

      const movieDetail = await movieService.getMovieDetail(movieId);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.themoviedb.org/3/movie/${movieId}?language=es-ES`,
        {
          headers: {
            Authorization: `Bearer your_mock_api_key`,
          },
        }
      );

      expect(movieDetail.id).toBe(movieId);
      expect(movieDetail.title).toBe("Kingdom of the Planet of the Apes");
    });
  });
});
