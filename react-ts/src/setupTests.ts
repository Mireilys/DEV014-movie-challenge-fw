import "@testing-library/jest-dom/extend-expect";
jest.mock("../src/config/config", () => ({
  apiConfig: {
    apiKey: "your_mock_api_key",
  },
}));
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
