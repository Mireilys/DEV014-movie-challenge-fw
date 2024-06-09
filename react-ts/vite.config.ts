import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("VITE_TOKEN_API:", process.env.VITE_TOKEN_API);

export default defineConfig({
  plugins: [react()],
});
