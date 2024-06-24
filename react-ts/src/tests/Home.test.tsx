import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import APIService from "../services/APIService";
import { Movie } from "../models/Movie";

// Importa o define los datos de películas simulados
const mockMovies: Movie[] = [
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

describe("Home Component", () => {
  beforeEach(() => {
    // Mockear la función getMovies de APIService con los datos simulados
    jest.spyOn(APIService, "getMovies").mockImplementation(() => {
      return Promise.resolve(mockMovies);
    });
  });

  afterEach(() => {
    // Restaurar el mock después de cada prueba
    jest.restoreAllMocks();
  });

  it("renders loading spinner while fetching movies", (done) => {
    render(<Home />);

    // Verificar que se muestra el spinner de carga
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Esperar a que se resuelva la promesa (simulando la carga de datos)
    APIService.getMovies().then(() => {
      // Verificar que el spinner ya no está presente (isLoading es false)
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      done();
    });
  });

  it("renders movies correctly after fetching", (done) => {
    render(<Home />);

    // Esperar a que se resuelva la promesa (simulando la carga de datos)
    APIService.getMovies().then(() => {
      // Verificar que las películas se renderizan correctamente
      mockMovies.forEach((movie) => {
        expect(screen.getByText(movie.title)).toBeInTheDocument();
        expect(screen.getByText(movie.overview)).toBeInTheDocument();
      });
      done();
    });
  });

  it("handles API error correctly", (done) => {
    // Mockear la función getMovies para simular un error
    jest.spyOn(APIService, "getMovies").mockImplementation(() => {
      return Promise.reject(new Error("API Error"));
    });

    render(<Home />);

    // Esperar a que se resuelva la promesa (simulando la carga de datos)
    APIService.getMovies().catch(() => {
      // Verificar que se muestra el mensaje de error adecuado
      expect(
        screen.getByText(/Error al recuperar películas/i)
      ).toBeInTheDocument();
      done();
    });
  });
});
