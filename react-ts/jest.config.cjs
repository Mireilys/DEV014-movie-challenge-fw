module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "/config.js",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.css$": "identity-obj-proxy",
    "^.+\\.(css|png|jpg|jpeg|svg)$": "<rootDir>/src/__mocks__/file-mock.cjs",
  },
};
