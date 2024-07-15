import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import App from "../App";
import fetchMock from "jest-fetch-mock";

jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));

describe("App Component", () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
  it("renders Home component when '/' route is active", async () => {
    await act(async () => {
      // Simulación de respuesta de fetch para la prueba de Home
      fetchMock.mockResponseOnce(
        JSON.stringify({
          /* datos válidos aquí */
        })
      );
    });

    render(<App />);

    // Verificar que el componente Home se renderice correctamente
    expect(screen.getByTestId("home-component")).toBeInTheDocument();
  });

  it("renders MovieDetail component when '/movie/:id' route is active", async () => {
    // Simular respuesta de fetch para la prueba de MovieDetail
    fetchMock.mockResponseOnce(JSON.stringify({}));

    // Simular el enrutamiento con una ruta específica usando MemoryRouter
    render(
      <MemoryRouter initialEntries={["/movie/123"]}>
        <App />
      </MemoryRouter>
    );

    // Verificar que el componente MovieDetail se renderice correctamente
    expect(screen.getByTestId("movie-detail-component")).toBeInTheDocument();
  });
});
