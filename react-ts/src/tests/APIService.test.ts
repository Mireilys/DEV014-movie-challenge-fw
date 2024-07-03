import APIService from "../services/APIService";
import { Movie } from "../models/Movie";
import { ApiMovieData } from "../utils/transformers";

// Mock de configuración fuera de la prueba
jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));

describe("APIService", () => {
  describe("getMovies", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation((url) => {
        if (url.includes("discover/movie")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                results: [
                  {
                    id: 653346,
                    title: "Kingdom of the Planet of the Apes",
                    backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
                    genre_ids: [878, 12, 28],
                    overview:
                      "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
                    poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
                    release_date: "2024-05-08",
                  },
                  {
                    id: 2,
                    title: "Example Movie 2",
                    genre_ids: [12],
                  },
                ],
                page: 1,
                total_pages: 1,
              }),
          });
        }

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

    it("fetches movies successfully", () => {
      const expectedMovies: Movie[] = [
        {
          id: 653346,
          title: "Kingdom of the Planet of the Apes",
          backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
          genre_ids: [878, 12, 28],
          overview:
            "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
          poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
          release_date: "2024-05-08",
          genres: ["Science Fiction", "Adventure", "Action"], // Debes ajustar esto según los datos reales recibidos
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
          genres: ["Science Fiction", "Adventure", "Action"],
        },
      ];

      return APIService.getMovies({
        filters: { page: 1, genreId: null, sortBy: null },
      }).then((data) => {
        const { movies } = data;

        expect(global.fetch).toHaveBeenCalledWith(
          "https://api.themoviedb.org/3/discover/movie?page=1",
          {
            headers: {
              Authorization: `Bearer your_mock_api_key`,
            },
          }
        );

        expect(movies.length).toBe(2);
        expect(movies[0].id).toBe(expectedMovies[0].id);
        expect(movies[0].title).toBe(expectedMovies[0].title);
      });
    });

    it("applies genre filter correctly", () => {
      return APIService.getMovies({
        filters: { page: 1, genreId: 12, sortBy: null },
      }).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://api.themoviedb.org/3/discover/movie?page=1&with_genres=12",
          {
            headers: {
              Authorization: `Bearer your_mock_api_key`,
            },
          }
        );
      });
    });

    it("applies sorting correctly", () => {
      return APIService.getMovies({
        filters: { page: 1, genreId: null, sortBy: "popularity.desc" },
      }).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc",
          {
            headers: {
              Authorization: `Bearer your_mock_api_key`,
            },
          }
        );
      });
    });

    it("applies both genre filter and sorting correctly", () => {
      return APIService.getMovies({
        filters: { page: 1, genreId: 12, sortBy: "popularity.desc" },
      }).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://api.themoviedb.org/3/discover/movie?page=1&with_genres=12&sort_by=popularity.desc",
          {
            headers: {
              Authorization: `Bearer your_mock_api_key`,
            },
          }
        );
      });
    });

    it("fetches movie genres successfully", () => {
      return APIService.getMovieGenres().then((genres) => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://api.themoviedb.org/3/genre/movie/list",
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
  });
});
