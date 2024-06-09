import { formatMovie } from "../utils/transformers";
import config from "../../config/config.json";

class APIService {
  static getMovies() {
    const apiKey = config.apiKey;
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
