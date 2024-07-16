import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));

jest.mock("../components/Home", () => () => <div>Mock Home</div>);
jest.mock("../components/MovieDetail", () => () => <div>Mock MovieDetail</div>);

describe("App Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Home")).toBeInTheDocument();
  });

  test("navigates to Home component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Home")).toBeInTheDocument();
  });

  test("navigates to MovieDetail component", () => {
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock MovieDetail")).toBeInTheDocument();
  });
});
