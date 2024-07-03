import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

jest.mock("../services/APIService"); // Mockear APIService
jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));

describe("App", () => {
  it("renders Home component on default route", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Verifica que el componente Home se renderice en la ruta por defecto "/"
    expect(screen.getByTestId("home-component")).toBeInTheDocument();
  });

  // Puedes añadir más pruebas para otras rutas si tienes configuraciones adicionales
});
