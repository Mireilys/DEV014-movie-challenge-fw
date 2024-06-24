export const apiConfig = {
  apiKey:
    typeof process !== "undefined" && process.env.VITE_TOKEN_API
      ? process.env.VITE_TOKEN_API
      : import.meta.env.VITE_TOKEN_API,
};

// let apiKey = "";

// if (typeof process !== "undefined" && process.env.VITE_TOKEN_API) {
//   apiKey = process.env.VITE_TOKEN_API;
// } else {
//   throw new Error(
//     "API key not found. Please provide VITE_TOKEN_API environment variable."
//   );
// }

// export const apiConfig = {
//   apiKey: apiKey,
// };
