import APIService from "../services/APIService";

// Mocking config outside the test
jest.mock("../../config/config.json", () => ({
  apiKey: "your_mock_api_key",
}));

describe("APIService", () => {
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
                poster: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
                overview: "This is an example movie.",
                release_date: "2024-05-08",
              },
              {
                id: 2,
                title: "Example Movie 2",
              },
            ],
          }),
        headers: new Headers(), // Ajusta las cabeceras según sea necesario
        redirected: false,
        status: 200,
        statusText: "OK",
        type: "basic",
        url: "https://api.themoviedb.org/3/discover/movie",
        clone: () => ({}),
        body: null,
        bodyUsed: false,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        blob: () => Promise.resolve(new Blob()),
        formData: () => Promise.resolve(new FormData()),
        text: () => Promise.resolve(""),
      })
    );
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("fetches movies successfully", () => {
    return APIService.getMovies().then((movies) => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            Authorization: `Bearer your_mock_api_key`,
          },
        }
      );

      // Here you can add your assertions for the movies data returned
      // For example:
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe("Kingdom of the Planet of the Apes");
    });
  });

  // Add other test cases as needed

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
