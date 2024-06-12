import { formatMovie } from "../utils/transformers";
import Movie from "../models/Movie";
import { ApiMovieData } from "../utils/transformers";
import { apiConfig } from "../config/config";

class APIService {
  static getMovies() {
    const apiKey = apiConfig.apiKey;
    console.log("API Key:", apiKey); //
    const url = "https://api.themoviedb.org/3/discover/movie";

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data from API:", data);
        return data.results.map(formatMovie);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        throw error;
      });
  }
}

export default APIService;
