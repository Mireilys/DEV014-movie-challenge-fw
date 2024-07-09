import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import APIService from "../services/APIService";

jest.mock("../services/APIService");

jest.mock("../services/APIService");

describe("MovieDetail component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner while fetching movie details", async () => {
    const mockMovieData = {
      id: 1,
      title: "Test Movie",
      overview: "This is a test movie",
      poster_path: "/test-poster.jpg",
      release_date: "2024-07-10",
      vote_average: 7.5,
    };

    (MovieDetail as jest.Mock).mockResolvedValueOnce(mockMovieData);

    render(
      <BrowserRouter>
        <MovieDetail />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Espera a que se resuelva la promesa del servicio mock
    await screen.findByText("Test Movie");

    // Verifica que ya no haya un spinner de carga
    expect(screen.queryByText("Loading...")).toBeNull();

    // Verifica que los datos de la película se rendericen correctamente
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("This is a test movie")).toBeInTheDocument();
    expect(screen.getByAltText("Movie Poster")).toBeInTheDocument();
  });
});
