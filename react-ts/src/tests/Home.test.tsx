// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import Home from "../components/Home";
// import APIService from "../services/APIService";
// import { Movie } from "../models/Movie";
// import { BrowserRouter } from "react-router-dom";

// jest.mock("../config/config", () => ({
//   apiConfig: {
//     apiKey: "your_mock_api_key",
//   },
// }));
// // Importa o define los datos de películas simulados
// const mockMovies: Movie[] = [
//   {
//     backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
//     genre_ids: [878, 12, 28],
//     id: 653346,
//     overview:
//       "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
//     poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
//     release_date: "2024-05-08",
//     title: "Kingdom of the Planet of the Apes",
//   },
//   {
//     backdrop_path: "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
//     genre_ids: [878, 28, 12],
//     id: 823464,
//     overview:
//       "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
//     poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
//     release_date: "2024-03-27",
//     title: "Godzilla x Kong: The New Empire",
//   },
// ];

// const mockResponse = {
//   metaData: {
//     pagination: {
//       currentPage: 1,
//       totalPages: 2,
//     },
//   },
//   movies: mockMovies,
// };
// const mockGenres = [
//   { id: 1, name: 'Action' },
//   { id: 2, name: 'Comedy' },
//   { id: 3, name: 'Drama' },
// ];

// const mockGenresResponse = mockGenres;

// describe("Home Component", () => {
//   beforeEach(() => {
//     // Mockear la función getMovies de APIService con los datos simulados
//     jest.spyOn(APIService, "getMovies").mockImplementation(() => {
//       return Promise.resolve(mockResponse);
//     });
//   });

//   afterEach(() => {
//     // Restaurar el mock después de cada prueba
//     jest.restoreAllMocks();
//   });

//   it("renders loading spinner while fetching movies", async () => {
//     render(<Home />, { wrapper: BrowserRouter });

//     // Verificar que se muestra el spinner de carga
//     expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

//     // Esperar a que se resuelva la promesa (simulando la carga de datos)
//     await waitFor(() => {
//       // Verificar que el spinner ya no está presente (isLoading es false)
//       expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
//     });
//   });

//   it("renders movies correctly after fetching", async () => {
//     render(<Home />, { wrapper: BrowserRouter });

//     // Esperar a que se resuelva la promesa (simulando la carga de datos)
//     await waitFor(() => {
//       // Verificar que las películas se renderizan correctamente
//       mockMovies.forEach((movie) => {
//         expect(screen.getByText(movie.title)).toBeInTheDocument();
//         expect(screen.getByText(movie.overview)).toBeInTheDocument();
//       });
//     });
//   });

//   it("handles API error correctly", async () => {
//     // Mockear la función getMovies para simular un error
//     jest.spyOn(APIService, "getMovies").mockImplementation(() => {
//       return Promise.reject(new Error("API Error"));
//     });

//     render(<Home />, { wrapper: BrowserRouter });

//     // Esperar a que se resuelva la promesa (simulando la carga de datos)
//     await waitFor(() => {
//       // Verificar que se muestra el mensaje de error adecuado
//       expect(
//         screen.getByText(/Error al recuperar películas/i)
//       ).toBeInTheDocument();
//     });
//   });
//   const mockGenres = [
//     { id: 1, name: "Action" },
//     { id: 2, name: "Comedy" },
//     { id: 3, name: "Drama" },
//   ];

//   // Define la respuesta simulada de la API para los géneros de películas
//   const mockGenresResponse = mockGenres;

//   // Mock de la función getMovieGenres en las pruebas
//   jest.spyOn(APIService, "getMovieGenres").mockImplementation(() => {
//     return Promise.resolve(mockGenresResponse);
//   });
// });
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../components/Home";
import APIService from "../services/APIService";
import { BrowserRouter } from "react-router-dom";

jest.mock("../services/APIService"); // Mockear APIService
jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));

const mockedMovies = [
  {
    id: 1,
    title: "Movie 1",
    overview: "Overview 1",
    poster_path: "/path/to/poster1.jpg",
    backdrop_path: "/path/to/backdrop1.jpg",
    genre_ids: [1, 2],
    release_date: "2022-01-01",
    genres: ["Action", "Comedy"],
  },
  {
    id: 2,
    title: "Movie 2",
    overview: "Overview 2",
    poster_path: "/path/to/poster2.jpg",
    backdrop_path: "/path/to/backdrop2.jpg",
    genre_ids: [1, 3],
    release_date: "2022-02-01",
    genres: ["Action", "Drama"],
  },
];

const mockedGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
];

describe("Home Component", () => {
  beforeEach(() => {
    const mockedGetMovies = APIService.getMovies as jest.MockedFunction<
      typeof APIService.getMovies
    >;
    const mockedGetMovieGenres =
      APIService.getMovieGenres as jest.MockedFunction<
        typeof APIService.getMovieGenres
      >;

    mockedGetMovies.mockResolvedValue({
      movies: mockedMovies,
      metaData: { pagination: { currentPage: 1, totalPages: 1 } },
    });

    mockedGetMovieGenres.mockResolvedValue(mockedGenres);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner while fetching movies", async () => {
    render(<Home />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });

  it("renders movies correctly after fetching", async () => {
    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() => {
      mockedMovies.forEach((movie) => {
        expect(
          screen.getByTestId(`movie-card-${movie.id}`)
        ).toBeInTheDocument();
        expect(screen.getByText(movie.title)).toBeInTheDocument();
        expect(screen.getByText(movie.overview)).toBeInTheDocument();
        expect(
          screen.getByText(`${new Date(movie.release_date).getFullYear()}`)
        ).toBeInTheDocument();
        movie.genres.forEach((genre) => {
          expect(screen.getByText(genre)).toBeInTheDocument();
        });
      });
    });
  });

  it("handles API error correctly", async () => {
    const errorMessage = "API Error";
    const mockedGetMovies = APIService.getMovies as jest.MockedFunction<
      typeof APIService.getMovies
    >;
    mockedGetMovies.mockRejectedValue(new Error(errorMessage));

    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(
        screen.getByText(/Error al recuperar películas/i)
      ).toBeInTheDocument();
    });
  });

  it("displays genres correctly", async () => {
    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() => {
      mockedGenres.forEach((genre) => {
        expect(screen.getByText(genre.name)).toBeInTheDocument();
      });
    });
  });
});
