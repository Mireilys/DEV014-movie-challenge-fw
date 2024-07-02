// import APIService from "../services/APIService";
// import { formatMovie, formatGenresToMap } from "../utils/transformers";
// import { Movie } from "../models/Movie";
// import { ApiMovieData } from "../utils/transformers";

// Mocking config outside the test
// jest.mock("../config/config", () => ({
//   apiConfig: {
//     apiKey: "your_mock_api_key",
//   },
// }));

// describe("APIService", () => {
//   beforeEach(() => {
//     global.fetch = jest.fn().mockImplementation(() =>
//       Promise.resolve({
//         ok: true,
//         json: () =>
//           Promise.resolve({
//             results: [
//               {
//                 id: 653346,
//                 title: "Kingdom of the Planet of the Apes",
//                 poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
//                 overview: "This is an example movie.",
//                 release_date: "2024-05-08",
//               },
//               {
//                 id: 2,
//                 title: "Example Movie 2",
//               },
//             ],
//             page: 1,
//             total_pages: 1,
//           }),
//       })
//     );
//   });

//   afterEach(() => {
//     (global.fetch as jest.Mock).mockClear();
//   });

//   it("fetches movies successfully", () => {
//     return APIService.getMovies().then((data) => {
//       const { movies } = data;
//       expect(global.fetch).toHaveBeenCalledWith(
//         "https://api.themoviedb.org/3/discover/movie?page=1",
//         {
//           headers: {
//             Authorization: `Bearer your_mock_api_key`,
//           },
//         }
//       );

//       expect(movies.length).toBe(2);
//       expect(movies[0].title).toBe("Kingdom of the Planet of the Apes");
//     });
//   });

//   // Add other test cases as needed

//   afterAll(() => {
//     jest.restoreAllMocks();
//   });
//   describe("APIService - getMovieGenres", () => {
//     beforeEach(() => {
//       global.fetch = jest.fn().mockImplementation(() =>
//         Promise.resolve({
//           ok: true,
//           json: () =>
//             Promise.resolve({
//               genres: [
//                 { id: 28, name: "Action" },
//                 { id: 12, name: "Adventure" },
//               ],
//             }),
//         })
//       );
//     });

//     afterEach(() => {
//       (global.fetch as jest.Mock).mockClear();
//     });

//     it("fetches movie genres successfully", () => {
//       return APIService.getMovieGenres().then((genres) => {
//         expect(global.fetch).toHaveBeenCalledWith(
//           "https://api.themoviedb.org/3/genre/movie/list",

//           {
//             headers: {
//               Authorization: `Bearer your_mock_api_key`,
//             },
//           }
//         );

//         expect(genres.length).toBe(2);
//         expect(genres[0].name).toBe("Action");
//         expect(genres[1].name).toBe("Adventure");
//       });
//     });

//     it("handles errors when fetching movie genres", () => {
//       (global.fetch as jest.Mock).mockImplementationOnce(() =>
//         Promise.reject(new Error("Failed to fetch"))
//       );

//       return APIService.getMovieGenres().catch((error) => {
//         expect(global.fetch).toHaveBeenCalledWith(
//           "https://api.themoviedb.org/3/genre/movie/list",
//           {
//             headers: {
//               Authorization: `Bearer your_mock_api_key`,
//             },
//           }
//         );

//         expect(error).toEqual(new Error("Failed to fetch"));
//       });
//     });

//     afterAll(() => {
//       jest.restoreAllMocks();
//     });
//   });
// });

// Mocking config outside the test
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
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
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
                },
              ],
              page: 1,
              total_pages: 1,
            }),
        })
      );
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
          genres: [], // Debes ajustar esto según los datos reales recibidos
        },
      ];

      return APIService.getMovies().then((data) => {
        const { movies } = data;

        expect(global.fetch).toHaveBeenCalledWith(
          "https://api.themoviedb.org/3/discover/movie?page=1",
          {
            headers: {
              Authorization: `Bearer your_mock_api_key`,
            },
          }
        );

        expect(movies.length).toBe(2); // Ajusta esto según los datos reales recibidos
        expect(movies[0].id).toBe(expectedMovies[0].id);
        expect(movies[0].title).toBe(expectedMovies[0].title);
      });
    });
  });

  describe("getMovieGenres", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              genres: [
                { id: 28, name: "Action" },
                { id: 12, name: "Adventure" },
              ],
            }),
        })
      );
    });

    afterEach(() => {
      (global.fetch as jest.Mock).mockClear();
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
