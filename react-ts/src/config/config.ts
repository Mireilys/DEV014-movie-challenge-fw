export const apiConfig = {
  apiKey:
    typeof process !== "undefined" && process.env.VITE_TOKEN_API
      ? process.env.VITE_TOKEN_API
      : import.meta.env.VITE_TOKEN_API,
};
