import * as React from "react"; // Asegúrate de importar React correctamente
import { Movie } from "../models/Movie";
import { act, render } from "@testing-library/react";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";

jest.mock("../config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));

describe("pruebas para Home", () => {
  it("Debería traer exitoxamente todas las movies", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            page: 1,
            results: [
              {
                adult: false,
                backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
                genre_ids: [878, 12, 28],
                id: 653346,
                original_language: "en",
                original_title: "Kingdom of the Planet of the Apes",
                overview:
                  "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
                popularity: 3264.146,
                poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
                release_date: "2024-05-08",
                title: "Kingdom of the Planet of the Apes",
                video: false,
                vote_average: 7.213,
                vote_count: 239,
              },
              {
                adult: false,
                backdrop_path: "/lLh39Th5plbrQgbQ4zyIULsd0Pp.jpg",
                genre_ids: [878, 28, 12],
                id: 823464,
                original_language: "en",
                original_title: "Godzilla x Kong: The New Empire",
                overview:
                  "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
                popularity: 1990.199,
                poster_path: "/1G978IJ2KDPl4Z4icZrxZTozb1v.jpg",
                release_date: "2024-03-27",
                title: "Godzilla x Kong: The New Empire",
                video: false,
                vote_average: 6.517,
                vote_count: 1058,
              },
            ],
            total_pages: 44135,
            total_results: 882684,
          }),
      });
    });

    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      const moviesExpected: Movie[] = [
        {
          id: 653346,
          title: "Kingdom of the Planet of the Apes",
          backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
          genre_ids: [878, 12, 28],
          overview:
            "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
          poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
          release_date: "2024-05-08",
          genres: ["Action", "Adventure"],
          vote_average: 8.5,
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
          vote_average: 8.9,
        },
      ];

      setTimeout(() => {
        expect(getByText(moviesExpected[0].title)).toBeInTheDocument();
        expect(getByText(moviesExpected[0].release_date)).toBeInTheDocument();
        expect(getByText(moviesExpected[0].poster_path)).toBeInTheDocument();
        expect(getByText(moviesExpected[0].overview)).toBeInTheDocument();
        expect(getByText(moviesExpected[0].vote_average)).toBeInTheDocument();

        expect(getByText(moviesExpected[1].title)).toBeInTheDocument();
        expect(getByText(moviesExpected[1].release_date)).toBeInTheDocument();
        expect(getByText(moviesExpected[1].poster_path)).toBeInTheDocument();
        expect(getByText(moviesExpected[1].overview)).toBeInTheDocument();
        expect(getByText(moviesExpected[1].vote_average)).toBeInTheDocument();
      }, 1000);
    });
  });
  it("Comprobar que se muestra un cargador de la app", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            page: 1,
            results: [
              {
                adult: false,
                backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
                genre_ids: [878, 12, 28],
                id: 653346,
                original_language: "en",
                original_title: "Kingdom of the Planet of the Apes",
                overview:
                  "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
                popularity: 3264.146,
                poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
                release_date: "2024-05-08",
                title: "Kingdom of the Planet of the Apes",
                video: false,
                vote_average: 7.213,
                vote_count: 239,
              },
              {
                adult: false,
                backdrop_path: "/lLh39Th5plbrQgbQ4zyIULsd0Pp.jpg",
                genre_ids: [878, 28, 12],
                id: 823464,
                original_language: "en",
                original_title: "Godzilla x Kong: The New Empire",
                overview:
                  "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
                popularity: 1990.199,
                poster_path: "/1G978IJ2KDPl4Z4icZrxZTozb1v.jpg",
                release_date: "2024-03-27",
                title: "Godzilla x Kong: The New Empire",
                video: false,
                vote_average: 6.517,
                vote_count: 1058,
              },
            ],
            total_pages: 44135,
            total_results: 882684,
          }),
      });
    });

    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      setTimeout(() => {
        expect(getByText("Loading...")).toBeInTheDocument();
      }, 100);
    });
  });
  it("Comprobar que se muestra un error en la app", async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            page: 1,
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
                genres: ["Action", "Adventure"],
                vote_average: 8.5,
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
                vote_average: 8.9,
              },
            ],
            total_pages: 44135,
            total_results: 882684,
          }),
      });
    });
    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      setTimeout(() => {
        expect(
          getByText("There has been a problem with your fetch operation:")
        ).toBeInTheDocument();
      }, 100);
    });
  });
});
