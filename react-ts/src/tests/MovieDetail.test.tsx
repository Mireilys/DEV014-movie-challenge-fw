import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom"; // Utilizamos MemoryRouter para propósitos de prueba
import MovieDetail from "../components/MovieDetail";
import movieService from "../services/movieService";
import { act } from "react";

jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));
jest.mock("../services/movieService");

describe("MovieDetail", () => {
  const mockMovie = {
    id: 123,
    title: "Mock Movie",
    overview: "Mock Overview",
    genres: ["Action", "Adventure"],
    release_date: "2023-01-01",
    vote_average: 7.5,
    poster_path: "/mock-poster.jpg",
    backdrop_path: "/mock-backdrop.jpg",
    genre_ids: [1, 2],
  };

  const renderComponent = async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/movies/123"]} initialIndex={0}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetail />} />
          </Routes>
        </MemoryRouter>
      );
    });
  };

  beforeEach(() => {
    (movieService.getMovieDetail as jest.Mock).mockReset();
  });

  test("debería navegar hacia atrás al hacer clic en el botón de regreso", async () => {
    (movieService.getMovieDetail as jest.Mock).mockResolvedValueOnce(mockMovie);
    await renderComponent();
    await waitFor(() =>
      expect(screen.getByText("Mock Movie")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("← Lista de Películas"));
  });
});
